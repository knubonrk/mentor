import './App.css'
import {useLocation} from 'react-router-dom';
import {useEffect} from "react";
import configureTeacherSecret from "./components/TeacherSecretFunctions.jsx";
import PageSelection from "./components/PageSelection.jsx";

function App() {
    const location = useLocation();
    const path = location.pathname.slice(1);

    useEffect(() => {
      configureTeacherSecret();
    }, []);

    return (
        <div>
            <h1>Teachers paradise - classroom {path}</h1>

            <PageSelection/>
        </div>
    );
}

export default App
