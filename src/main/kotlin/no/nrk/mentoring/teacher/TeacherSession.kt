package no.nrk.mentoring.teacher

import kotlinx.serialization.Serializable

@Serializable
data class TeacherSession(val sessionSecret: String)