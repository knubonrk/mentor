package no.nrk.mentoring.classes

import io.ktor.server.response.respondText
import io.ktor.server.routing.Routing
import io.ktor.server.routing.get
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import no.nrk.mentoring.profile.getProfileSuggestions

fun Routing.configureClassesRouting() {
    get("/api/profile/suggestions") {
        call.respondText(Json.encodeToString(getProfileSuggestions()))
    }
}