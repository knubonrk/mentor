package no.nrk.mentoring.classes

import no.nrk.mentoring.plugins.ClientMessage
import java.util.Collections

private val participanNames = Collections.synchronizedMap(mutableMapOf<String, String>())

private val votes = Collections.synchronizedMap(mutableMapOf<Vote, String>())

fun registerParticipant(sessionId: String, nick: String) {
    participanNames[sessionId] = nick
}

fun registerVote(sessionId: String, code: String, choice: String) {
    votes[Vote(sessionId, code)] = choice

    postVoteSummary(code)
}

fun postVoteSummary(code: String) {

    val summary =
        votes.filter { it.key.code == code }.entries.groupBy {
            it.value
        }.map { (key, value) -> key to value.count() }.toMap()

    //TODO must send this to the websocket for Teacher.
}

fun consumeMessage(sessionId: String, message: ClientMessage) {
    when {
        message.type == "config" && message.key == "nick" -> registerParticipant(sessionId, message.data)
        message.type == "vote" -> registerVote(sessionId, message.key, message.data)
    }

}


data class Vote(val ownerSessionId: String, val code: String)