package no.nrk.mentoring.git

import org.eclipse.jetty.ee10.servlet.ServletContextHandler
import org.eclipse.jetty.server.Server
import org.eclipse.jgit.http.server.GitServlet
import org.eclipse.jgit.transport.ReceiveCommand
import org.eclipse.jgit.transport.ReceivePack
import org.eclipse.jgit.transport.resolver.FileResolver
import java.io.File


fun startJettyForGit() {
    // Directory containing your bare repo(s) (adjust to your path)
    val gitReposRoot = File("studentsrepos") // this should contain your bare repo e.g., /tmp/myrepo.git

    // Create a GitServlet
    val gitServlet = GitServlet().apply {
        setRepositoryResolver(FileResolver(gitReposRoot, true))
        // Allow pushes without auth by setting a permissive ReceivePackFactory
        setReceivePackFactory { req, repo ->
            val rp = ReceivePack(repo) // creates ReceivePack without any access checks

            rp.setPostReceiveHook { receivePack, commands ->
                println("=== Push detected to repo: ${repo.directory}")

                commands.forEach { cmd ->
                    if (cmd.result == ReceiveCommand.Result.OK) {
                        println(" -> Ref updated: ${cmd.refName} ${cmd.oldId.name} -> ${cmd.newId.name}")
                    }
                }
            }

            rp
        }
    }

    // Create a Jetty server on port 8081
    val server = Server(8081)

    // Map GitServlet to /git/* endpoint
    val context = ServletContextHandler(ServletContextHandler.NO_SECURITY)
    context.contextPath = "/"
    context.addServlet(gitServlet, "/git/*")

    server.setHandler(context)

    // Start the server
    server.start()
    println("Git HTTP server started at http://localhost:8081/git/")
}

