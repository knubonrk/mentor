package no.nrk.mentoring.classes

import java.nio.charset.Charset

var currentCode = "hello_world"
var voteActive = false


fun fetchCodeConfiguration(): Map<String, String> {
    return mapOf(
        "CodeA" to loadResourceAsString("/code/$currentCode/CodeA.java"),
        "CodeB" to loadResourceAsString("/code/$currentCode/CodeB.java"),
        "code" to currentCode,
        "vote" to voteActive.toString(),
    )
}

fun loadResourceAsString(filename: String, charset: Charset = Charsets.UTF_8): String {
    val resource = { }::class.java.getResource(filename)
        ?: throw RuntimeException("Could not load file or content missing from $filename")
    return resource.readText(charset)
}
fun availableSources():List<String> {
    return listOf("hello_world", "sort")
}