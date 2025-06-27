package no.nrk.mentoring

import installCORS
import io.ktor.server.application.*
import no.nrk.mentoring.git.startJettyForGit
import no.nrk.mentoring.plugins.configureRouting
import no.nrk.mentoring.plugins.configureSecurity
import no.nrk.mentoring.plugins.configureSerialization

fun main(args: Array<String>) {
    startJettyForGit()
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    installCORS()
    configureSerialization()
    configureSecurity()
    configureRouting()
}
