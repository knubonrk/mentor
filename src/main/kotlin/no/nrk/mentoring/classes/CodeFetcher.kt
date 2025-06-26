package no.nrk.mentoring.classes

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import java.nio.charset.Charset

var currentCode = "hello_world"
var voteState = "code"

fun fetchCodeConfiguration(): CodeConfiguration {
    return CodeConfiguration(
        codeA = loadResourceAsString("/code/$currentCode/CodeA.java"),
        codeB = loadResourceAsString("/code/$currentCode/CodeB.java"),
        code = currentCode,
        voteState = voteState,
        voteResults = if (voteState == "results") getVoteSummary(currentCode).associate { it.key to it.value } else emptyMap(),
        currentPage = "code"
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

@Serializable
data class CodeConfiguration(
    @SerialName("current_page")
    val currentPage:String,
    @SerialName("CodeA")
    val codeA: String,
    @SerialName("CodeB")
    val codeB: String,
    val code: String, val voteState: String, val voteResults: Map<String, Int>?
)