package no.nrk.mentoring.classes

import no.nrk.mentoring.plugins.ClientMessage
import java.util.Collections

private val participantsNames = Collections.synchronizedMap(mutableMapOf<String, String>())

fun registerParticipant(sessionId: String, nick: String) {
    participantsNames[sessionId] = nick
}

fun consumeMessage(sessionId: String, message: ClientMessage) {
    when {
        message.type == "config" && message.key == "nick" -> registerParticipant(sessionId, message.data)
        message.type == "vote" -> registerVote(sessionId, message.data, message.key)
    }

}


data class Vote(val ownerSessionId: String, val code: String)