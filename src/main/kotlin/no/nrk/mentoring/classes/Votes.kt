package no.nrk.mentoring.classes

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import no.nrk.mentoring.plugins.teacherMessageFlow
import java.util.Collections
import kotlin.collections.component1
import kotlin.collections.component2

private val votes = Collections.synchronizedMap(mutableMapOf<Vote, String>())

fun registerVote(sessionId: String, code: String, choice: String) {
    votes[Vote(sessionId, code)] = choice

    postVoteSummary(code)
}

fun postVoteSummary(code: String) {

    val summary =
        votes.filter { it.key.code == code }.entries.groupBy {
            it.value
        }.map { (key, value) -> Summary(key = key, value = value.count()) }

    teacherMessageFlow.value = Json.encodeToString(ActionWrapper(summary))
}

@Serializable
data class ActionWrapper(
    val voteSummery:List<Summary>?
)

@Serializable
data class Summary(val key: String, val value: Int)