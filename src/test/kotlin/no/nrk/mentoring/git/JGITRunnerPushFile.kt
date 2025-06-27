package no.nrk.mentoring.git

import org.eclipse.jgit.api.Git
import java.io.File
import java.io.FileWriter


fun main() {
    createGitTMPRepo()
}

fun createGitTMPRepo() {
    val repoDir = File("studentsrepos/myrepo.git")
    Git.init()
        .setDirectory(repoDir)
        .setBare(true) // makes a bare repo suitable for serving
        .call()

    println("Created bare repo at " + repoDir.absolutePath)


    // Clone the bare repo into a working dir to add files
    val workDir = File("/tmp/myrepo-working2")
    val cloned = Git.cloneRepository()
        .setURI(repoDir.toURI().toString())
        .setDirectory(workDir)
        .call()

    // Copy your file into the working directory
    val helloFile = File(workDir, "hello.txt")
    FileWriter(helloFile).use { fw ->
        fw.write("Hello world from JGit!\n")
    }

    // Add + commit
    cloned.add().addFilepattern("hello.txt").call()
    cloned.commit().setMessage("Add hello world file").setAuthor("You", "you@example.com").call()


    // Push back to bare repo
    cloned.push().call()

    cloned.close()

    println("Repo refetched with initial commit.")
}
