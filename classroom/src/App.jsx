import './App.css'
import {useEffect, useState, } from "react";
import useWebSocket from "react-use-websocket";
import {motion, AnimatePresence} from "framer-motion";
import WelcomePage from "./pages/Welcome.jsx"
import TaskPage from "./pages/Task.jsx";
import CodePage from "./pages/Code.jsx";
import ProfileSetupPage from "./pages/ProfilePage.jsx";

function App() {
    const [activePage, setActivePage] = useState("welcome")

    useEffect(() => {
        const nickname = localStorage.getItem('nickname');
        if (!nickname) {
            setActivePage("profileSetup");
        }
    }, []);

    const WS_URL = "ws://127.0.0.1:8080/stream"
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )


    useEffect(() => {
        console.log("Connection state changed to "+readyState);
    }, [readyState])

    useEffect(() => {
        if (activePage === "profileSetup") {
            return;
        }
        if(lastJsonMessage && lastJsonMessage["current_page"]) {
            setActivePage(lastJsonMessage["current_page"]);
        }
        console.log("Got a new message");
        console.log(lastJsonMessage);
    }, [lastJsonMessage])

    const pageVariants = {
        initial: {
            rotateX: 90,                 // Starts with a vertical flip
            rotateY: -90,                // Adds a horizontal angle for extra flair
            opacity: 0,
            scale: 0.8,                  // Smaller scale for a zoom-in effect
            backgroundColor: "#ff6347",  // Flashy coral color to grab attention
            transition: {
                duration: 0.4,
                ease: "easeIn",
            },
        },
        animate: {
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1.1,                  // Slight zoom-in to give a bouncy feel
            backgroundColor: ["#ff6347", "#87ceeb", "#242424"], // Color shift to final color
            transition: {
                duration: 1.2,
                ease: "easeOut",
                type: "spring",
                stiffness: 80,
                damping: 10,
                backgroundColor: {
                    duration: 1,
                    ease: "easeInOut",
                },
            },
        },
        exit: {
            rotateX: -90,                // Exits with a vertical flip
            rotateY: 90,                 // Twists to add dynamic movement
            opacity: 0,
            scale: 0.6,                  // Shrinks for a zoom-out effect
            filter: "blur(8px) contrast(120%)", // Adds blur and contrast for flair
            backgroundColor: "#242424",  // Final exit background color
            transition: {
                duration: 0.7,
                ease: "easeIn",
            },
        },
    };

    const profileSetCallback = () => {
        if (lastJsonMessage && lastJsonMessage["current_page"]) {
            setActivePage(lastJsonMessage["current_page"]);
        } else {
            setActivePage("welcome")
        }
    }

    return (
      <div style={{perspective: 1000}}>
          <AnimatePresence mode="wait">
              {activePage === "welcome" && (
                  <motion.div
                      key="welcome"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                  >
                      <WelcomePage/>
                  </motion.div>
              )}

              {activePage === "tasks" && (
                  <motion.div
                      key="tasks"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                  >
                      <TaskPage/>
                  </motion.div>
              )}

              {activePage === "code" && (
                  <motion.div
                      key="code"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                  >
                      <CodePage json={lastJsonMessage}/>
                  </motion.div>
              )}

              {activePage === "profileSetup" && (
                  <motion.div
                      key="profileSetup"
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                  >
                      <ProfileSetupPage profileSetCallback={profileSetCallback}/>
                  </motion.div>
              )}

          </AnimatePresence>
      </div>
  )
}

export default App
