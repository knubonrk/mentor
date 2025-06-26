
import './App.css'
import {useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import configureTeacherSecret from "./components/TeacherSecretFunctions.jsx";
import PageSelection from "./components/PageSelection.jsx";
import useWebSocket from "react-use-websocket";

function App() {
    const location = useLocation();
    const path = location.pathname.slice(1);

    const [votes, setVotes] = useState()


    const WS_URL = "ws://127.0.0.1:8080/streamteacher"
    // eslint-disable-next-line no-unused-vars
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {
      configureTeacherSecret();
    }, []);

    useEffect(() => {
        console.log("Connection state changed to " + readyState);
    }, [readyState])

    useEffect(() => {
        console.log("Got a new message");
        console.log(lastJsonMessage);
        if(lastJsonMessage && lastJsonMessage.voteSummery) {
            setVotes(lastJsonMessage.voteSummery);
        }
    }, [lastJsonMessage])

    return (
        <div>
            <h1>Teachers paradise - classroom {path}</h1>

            <PageSelection voteSummary={votes}/>
        </div>
    );
}

export default App
