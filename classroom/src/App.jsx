import './App.css'
import {useEffect, useState, } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket"
import WelcomePage from "./pages/Welcome.jsx"
import TaskPage from "./pages/Task.jsx";
import CodePage from "./pages/Code.jsx";

function App() {
    const [activePage, setActivePage] = useState("welcome")

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
        if(lastJsonMessage && lastJsonMessage["current_page"]) {
            setActivePage(lastJsonMessage["current_page"]);
        }
        console.log("Got a new message");
        console.log(lastJsonMessage);
    }, [lastJsonMessage])

  return (

    <>

        {activePage === "welcome" && <WelcomePage/>}
        {activePage === "tasks" && <TaskPage/>}
        {activePage === "code" && <CodePage json={lastJsonMessage}/>}
    </>
  )
}

export default App
