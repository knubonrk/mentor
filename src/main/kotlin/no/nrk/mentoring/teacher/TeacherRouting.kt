package no.nrk.mentoring.teacher

import io.ktor.http.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import no.nrk.mentoring.classes.availableSources
import no.nrk.mentoring.classes.currentCode
import no.nrk.mentoring.classes.voteActive
import no.nrk.mentoring.plugins.Config


fun Routing.configureTeacherRouting(currentPageFlow: MutableStateFlow<String>) {
    post("/api/session/page/{page}") {
        val session = call.request.cookies["teacher_session"]
        if (session == null || !sessionValid(session)) {
            call.respond(HttpStatusCode.Unauthorized)
            return@post
        }

        val page = call.request.pathVariables["page"].toString()
        currentPageFlow.value = page
        call.respondText("OK now value is " + currentPageFlow.value)
    }
    post("/api/session/code/{example}/{vote}") {
        val session = call.request.cookies["teacher_session"]
        if (session == null || !sessionValid(session)) {
            call.respond(HttpStatusCode.Unauthorized)
            return@post
        }

        val example = call.request.pathVariables["example"].toString()
        val vote = call.request.pathVariables["vote"].toString()
        currentCode = example
        voteActive = vote == "true"
        currentPageFlow.value = "code-$example-$voteActive"
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
                    name = "teacher_session",
                    value = sessionSecret,
                    path = "/",               // Make cookie accessible across routes
                    httpOnly = false,          // Prevent JS access (recommended for security)
                    secure = isSecure,            // Use true if served over HTTPS
                    maxAge = 60 * 60 * 5
                )
            )
        }

        call.respondText(Json.encodeToString(success))
    }
}