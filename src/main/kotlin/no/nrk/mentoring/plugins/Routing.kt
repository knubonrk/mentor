package no.nrk.mentoring.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import io.ktor.websocket.Frame.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.consumeAsFlow
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import no.nrk.mentoring.classes.configureClassesRouting
import no.nrk.mentoring.classes.fetchCodeConfiguration
import no.nrk.mentoring.teacher.configureTeacherRouting
import java.util.UUID
import kotlin.time.Duration.Companion.seconds

fun Application.configureRouting() {
    install(WebSockets) {
        pingPeriod = 60.seconds
        timeout = 15.seconds
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    val currentPageFlow = MutableStateFlow("welcome")

    routing {
        singlePageApplication {
            filesPath = "classroom/dist"
            defaultPage = "index.html"

            ignoreFiles { it.endsWith(".txt") }
        }
        singlePageApplication {
            filesPath = "teacher/dist"
            defaultPage = "index.html"

            ignoreFiles { it.endsWith(".txt") }
        }

        webSocket("/stream") {
            val socketId = UUID.randomUUID().toString()
            println("WebSocket connected: $socketId")

            val job = launch {
                currentPageFlow.collect { page ->
                    if (page.startsWith("code")) {
                        send(Text(Json.encodeToString(mapOf("current_page" to "code") + fetchCodeConfiguration())))
                    } else {
                        send(Text(Json.encodeToString(mapOf("current_page" to page))))
                    }
                }
            }

            runCatching {
                incoming.consumeAsFlow().collect { frame ->
                    if (frame is Text) {
                        val text = frame.readText()
                        println("Received: $text for $socketId")
                    } else {
                        println("Got some frame type ${frame.frameType} ${frame}")
                    }
                }
            }.onFailure { exception ->
                println("WebSocket exception: ${exception.localizedMessage}")
            }.also {
                job.cancel()
            }
        }

        configureClassesRouting()
        configureTeacherRouting(currentPageFlow)

    }
}


@Serializable
data class Config(val pages: List<String>, val code: List<String>)
