import { useEffect, useState } from "react";
import "./PageSelection.css";

function PageSelection({ voteSummary }) {
    const [material, setMaterial] = useState();
    const [selectedPage, setSelectedPage] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [voteState, setVoteState] = useState("code");

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
        if (selectedPage === 'code') {
            fetch(`http://localhost:8080/api/session/code/${selectedCode}/${voteState}`, {
                method: 'POST',
                credentials: 'include'
            });
            return;
        }

        fetch(`http://localhost:8080/api/session/page/${selectedPage}`, {
            method: 'POST',
            credentials: 'include'
        });
    };

    return (
        <div className="page-selection-container">
            <div className="left-column">
                <div>
                    <h2>Select page:</h2>
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
                    <h2>Select active code:</h2>
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

                <div style={{ margin: '1rem 0' }}>
                    <label>
                        <input
                            type="radio"
                            value={"No"}
                            name={"votesState"}
                            onClick={(e) => setVoteState("code")}
                        /> Just code
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={"Vote active"}
                            name={"votesState"}
                            onClick={(e) => setVoteState("vote")}
                        /> Vote active
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={"Results active"}
                            name={"votesState"}
                            onClick={(e) => setVoteState("results")}
                        /> Results active
                    </label>
                </div>

                <input type="button" onClick={handleChangePage} value="Change active page" />
            </div>

            <div className="right-column">
                <h2>Vote Summary</h2>
                {voteSummary && voteSummary.length > 0 ? (
                    <table className="vote-table">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Votes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {voteSummary.map(entry => (
                            <tr key={entry.key}>
                                <td>{entry.key}</td>
                                <td>{entry.value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No votes yet</p>
                )}
            </div>
        </div>
    );
}

export default PageSelection;