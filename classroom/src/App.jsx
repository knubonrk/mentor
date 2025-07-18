import './App.css'
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {motion, AnimatePresence} from "framer-motion";
import WelcomePage from "./pages/WelcomePage.jsx"
import TaskPage from "./pages/TaskPage.jsx";
import CodePage from "./pages/CodePage.jsx";
import ProfileSetupPage from "./pages/ProfilePage.jsx";
import Header from "./components/Header.jsx";

function App() {
    const [activePage, setActivePage] = useState("welcome")

    const WS_URL = "ws://127.0.0.1:8080/stream"
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const isPresenter = urlParams.get('presenter') === 'true';

        const nickname = isPresenter ? "Presenter" : localStorage.getItem('nickname');

        if (!nickname) {
            setActivePage("profileSetup");
        } else {
            sendJsonMessage({ type: "config", key: "nick", data: nickname });
        }

    }, []);


    useEffect(() => {
        console.log("Connection state changed to " + readyState);
    }, [readyState])

    useEffect(() => {
        if (activePage === "profileSetup") {
            return;
        }
        if (lastJsonMessage && lastJsonMessage["current_page"]) {
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
        const nickname = localStorage.getItem('nickname');
        sendJsonMessage({ type: "config", key: "nick", data: nickname });

        if (lastJsonMessage && lastJsonMessage["current_page"]) {
            setActivePage(lastJsonMessage["current_page"]);
        } else {
            setActivePage("welcome")
        }
    }

    return (<div style={{perspective: 1000, display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <div className="app-container">
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
                            <CodePage json={lastJsonMessage} sendJsonMessage={sendJsonMessage}/>
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
        </div>
    )
}

export default App