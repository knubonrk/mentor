import {useEffect, useState} from "react";
import "./PageSelection.css"

function PageSelection() {

    const [material, setMaterial] = useState();
    const [selectedPage, setSelectedPage] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [voteActive, setVoteActive] = useState(false);

    useEffect(() => {
        async function fetchMaterial() {
            try {
                const response = await fetch('http://127.0.0.1:8080/api/config/material');
                if (response.ok) {
                    const data = await response.json();
                    setMaterial(data);
                }
            } catch (error) {
                console.error('Failed to fetch material:', error);
            }
        }

        fetchMaterial();
    }, []);


    const handleChangePage = () => {

        if(selectedPage === 'code') {
            fetch('http://localhost:8080/api/session/code/' + selectedCode + "/" + voteActive, {
                method: 'POST',
                credentials: 'include'
            });
        }

        fetch('http://localhost:8080/api/session/page/' + selectedPage, {method: 'POST',  credentials: 'include'});

    }

    return <div style={{textAlign: 'left'}}>
        <div>
            Select page:
            <ul>
                {material && material.pages.map(page => (
                    <li key={page}>
                        <label>
                            <input
                                type="radio"
                                value={page}
                                checked={selectedPage === page}
                                onChange={e => setSelectedPage(e.target.value)}
                            />
                            {page}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            Select active code:
            <ul>
                {material && material.code.map(code => (
                    <li key={code}>
                        <label>
                            <input
                                type="radio"
                                value={code}
                                checked={selectedCode === code}
                                onChange={e => setSelectedCode(e.target.value)}
                            />
                            {code}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={voteActive}
                    onChange={(e) => setVoteActive(e.target.checked)}
                />
                Vote active
            </label>
        </div>


        <input type={"button"} onClick={handleChangePage} value={"Change active page"}/>

    </div>
}

export default PageSelection;