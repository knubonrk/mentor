package no.nrk.mentoring.teacher

var ownerSecret:String? = null

fun registerSession(sessionSecret:String): Boolean {

    if(ownerSecret == sessionSecret) {
        return true
    }

    if(ownerSecret != null) {
        return false
    }

    ownerSecret = sessionSecret
    return true
}

fun sessionValid(sessionSeret:String):Boolean {
    return ownerSecret == sessionSeret
}