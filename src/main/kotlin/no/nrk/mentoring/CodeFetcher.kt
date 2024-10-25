package no.nrk.mentoring

import java.nio.charset.Charset

var currentCode = "hello_world"

fun fetchCode(): Map<String, String> {
    return mapOf(
        "CodeA" to loadResourceAsString("/code/$currentCode/CodeA.java"),
        "CodeB" to loadResourceAsString("/code/$currentCode/CodeB.java")
    )
}

fun loadResourceAsString(filename: String, charset: Charset = Charsets.UTF_8): String {
    val resource = { }::class.java.getResource(filename)
        ?: throw RuntimeException("Could not load file or content missing from $filename")
    return resource.readText(charset)
}