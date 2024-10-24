package no.nrk.mentoring.plugins

import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.http.content.ignoreFiles
import io.ktor.server.http.content.singlePageApplication
import io.ktor.server.routing.*
import io.ktor.server.sse.*
import io.ktor.sse.*

fun Application.configureRouting() {
    install(SSE)

    routing {

        singlePageApplication {
            useResources = false
            filesPath = "classroom/dist"
            defaultPage = "index.html"

            ignoreFiles { it.endsWith(".txt") }
        }

        sse("/stream") {
            send(ServerSentEvent("world"))
        }

    }
}
