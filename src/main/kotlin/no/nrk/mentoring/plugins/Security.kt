package no.nrk.mentoring.plugins

import io.ktor.server.application.*
import io.ktor.server.sessions.*
import no.nrk.mentoring.teacher.TeacherSession

fun Application.configureSecurity() {
    install(Sessions) {
        cookie<TeacherSession>("teacher_session") {
            cookie.path = "/"
            cookie.httpOnly = true
            cookie.extensions["SameSite"] = "lax"
            cookie.secure = System.getProperty("COOKIE_SECURE", "true").toBoolean()
        }
    }
}
