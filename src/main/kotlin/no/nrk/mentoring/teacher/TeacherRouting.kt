package no.nrk.mentoring.teacher

import io.ktor.http.Cookie
import io.ktor.http.HttpStatusCode
import io.ktor.server.plugins.origin
import io.ktor.server.request.receiveParameters
import io.ktor.server.response.respond
import io.ktor.server.response.respondText
import io.ktor.server.routing.Routing
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.sessions.get
import io.ktor.server.sessions.sessions
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import no.nrk.mentoring.classes.availableSources
import no.nrk.mentoring.classes.currentCode
import no.nrk.mentoring.plugins.Config


fun Routing.configureTeacherRouting(currentPageFlow: MutableStateFlow<String>) {
    post("/api/session/{session}/page/{page}") {
        val session = call.sessions.get<TeacherSession>()
        if (session == null || !sessionValid(session.sessionSecret)) {
            call.respond(HttpStatusCode.Unauthorized)
            return@post
        }

        val page = call.request.pathVariables["page"].toString()
        currentPageFlow.value = page
        call.respondText("OK now value is " + currentPageFlow.value)
    }
    post("/api/session/{session}/code/{example}") {
        val session = call.sessions.get<TeacherSession>()
        if (session == null || !sessionValid(session.sessionSecret)) {
            call.respond(HttpStatusCode.Unauthorized)
            return@post
        }

        val example = call.request.pathVariables["example"].toString()
        currentCode = example
        call.respondText("Current code is now '$currentCode'")
    }
    get("/api/config/material") {
        val config = Config(pages = listOf("tasks", "code", "welcome"), code = availableSources())
        call.respondText(Json.encodeToString(config))
    }
    post("/api/teacher/reserve_me_as_admin") {
        val params = call.receiveParameters()
        val sessionSecret = params["sessionSecret"]

        val success = registerSession(sessionSecret!!)

        if (success) {
            val isSecure = call.request.origin.scheme == "https"
            call.response.cookies.append(
                Cookie(
                    name = "sessionSecret",
                    value = sessionSecret,
                    path = "/",               // Make cookie accessible across routes
                    httpOnly = true,          // Prevent JS access (recommended for security)
                    secure = isSecure,            // Use true if served over HTTPS
                    maxAge = 60 * 60 * 5
                )
            )
        }

        call.respondText(Json.encodeToString(success))
    }
}