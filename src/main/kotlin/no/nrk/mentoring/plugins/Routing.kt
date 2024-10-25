package no.nrk.mentoring.plugins

import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.http.content.ignoreFiles
import io.ktor.server.http.content.singlePageApplication
import io.ktor.server.response.respondText
import io.ktor.server.routing.*
import io.ktor.server.websocket.WebSockets
import io.ktor.server.websocket.pingPeriod
import io.ktor.server.websocket.timeout
import io.ktor.server.websocket.webSocket
import io.ktor.websocket.Frame.Text
import io.ktor.websocket.readText
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import no.nrk.mentoring.fetchCode
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

        webSocket("/stream") { // WebSocket route
            val job = launch {
                currentPageFlow.collect { page ->
                    if (page == "code") {
                        send(Text(Json.encodeToString(mapOf("current_page" to page) + fetchCode())))
                    } else {
                        send(Text(Json.encodeToString(mapOf("current_page" to page))))
                    }
                }
            }

            runCatching {
                incoming.consumeAsFlow().collect { frame ->
                    if (frame is Text) {
                        val text = frame.readText()
                        println("Received: $text")
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

        post("/api/session/{session}/page/{page}") {
            val page = call.request.pathVariables["page"].toString()
            currentPageFlow.value = page
            call.respondText("OK now value is "+currentPageFlow.value)
        }

    }
}
