package no.nrk.mentoring.profile

import kotlinx.serialization.Serializable

fun getProfileSuggestions(): ProfileSuggestion {
    val adjectives1 = listOf(
        "beautiful", "quick", "friendly", "happy", "elegant", "clever", "brave", "graceful", "charming", "funny",
        "tiny", "huge", "small", "massive", "tall", "short", "fat", "slim", "giant", "compact",
        "young", "ancient", "new", "old", "modern", "antique", "fresh", "mature", "timeless", "vintage"
    )

    val adjectives2 = listOf(
        "red", "blue", "green", "yellow", "black", "white", "silver", "golden", "orange", "purple",
        "round", "square", "flat", "curved", "spiky", "smooth", "fluffy", "bumpy", "striped", "polka-dot",
        "wooden", "metal", "plastic", "glass", "rubber", "stone", "paper", "cloth", "leather", "crystal"
    )

    val nouns = listOf(
        "robot", "fox", "cat", "dog", "dragon", "owl", "eagle", "tiger", "lion", "bear",
        "rabbit", "mouse", "wolf", "shark", "dolphin", "horse", "panther", "unicorn", "golem", "phoenix",
        "drone", "device", "machine", "engine", "gadget", "creature", "beast", "monster", "automaton", "thing"
    )

    val selectedAdjectives1 = adjectives1.shuffled().take(4)
    val selectedAdjectives2 = adjectives2.shuffled().take(4)
    val selectedNouns = nouns.shuffled().take(4)

    return ProfileSuggestion(
        listOf(
            selectedAdjectives1,
            selectedAdjectives2,
            selectedNouns
        )
    )
}

@Serializable
data class ProfileSuggestion(val suggestions: List<List<String>>)