import './App.css'
import {useLocation} from 'react-router-dom';
import {useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const location = useLocation();
    const path = location.pathname.slice(1);

    useEffect(() => {
        let secret = localStorage.getItem('sessionSecret');

        if (!secret) {
            const newSecret = uuidv4();

            let formData = new FormData();
            formData.append('sessionSecret', newSecret);

            fetch('http://localhost:8080/api/teacher/reserve_me_as_admin', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data === true) {
                        localStorage.setItem('sessionSecret', newSecret);
                    } else {
                        alert("Omstart baktjeneren for å få sesjonen.");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert("Noe gikk galt.");
                });
        }
    }, []); // Empty dependency array to run only once on mount


    return (
        <div>
            <h1>Teachers paradise - classroom {path}</h1>
        </div>
    );
}

export default App
