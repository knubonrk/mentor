package no.nrk.mentoring.plugins

import io.ktor.http.*
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sse.*
import io.ktor.server.webjars.*
import io.ktor.sse.*

fun Application.configureRouting() {
    install(SSE)
    install(Webjars) {
        path = "/webjars" //defaults to /webjars
    }

    routing {

        get("/") {
            call.respondText("Hello World!")
        }
        sse("/hello") {
            send(ServerSentEvent("world"))
        }
        get("/webjars") {
            call.respondText("<script src='/webjars/jquery/jquery.js'></script>", ContentType.Text.Html)
        }

    }
}
