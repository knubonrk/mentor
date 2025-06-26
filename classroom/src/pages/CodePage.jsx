import Highlight from 'react-highlight';
import {useState} from "react";
import "highlight.js/styles/stackoverflow-light.css";
import './CodePage.css';

const CodePage = ({ json, sendJsonMessage }) => {
    const [votedText, setVotedText] = useState(null);

    const handleVote = (choice) => {
        sendJsonMessage({ type: "vote", key: choice, data: json.code });

        setVotedText(choice);
        setTimeout(() => setVotedText(null), 1000);
    };

    const showVoteButtons = json.voteState === "vote";
    const showResults = json.voteState === "results";

    const codeA_votes = json.voteResults?.CodeA || 0;
    const codeB_votes = json.voteResults?.CodeB || 0;
    const maxVotes = Math.max(codeA_votes, codeB_votes, 1);

    const isWinner = (votes) => votes === maxVotes && maxVotes > 0;

    return (
        <>
            <div className="code-row">
                <div className="code-block">
                    <Highlight className="java">
                        {json.CodeA}
                    </Highlight>
                </div>
                {showVoteButtons && (
                    <div className="vote-button-wrapper">
                        <button className="vote-button" onClick={() => handleVote("CodeA")}>
                            I like this the best
                        </button>
                        {votedText === "CodeA" && (
                            <div className="voted-emoji-heart">
                                <div className="voted-heart">❤️</div>
                                <div className="voted-thumbs">👍</div>
                            </div>
                        )}
                    </div>
                )}
                {showResults &&
                    <div className="vote-result">
                        <div className="vote-bar-wrapper">
                            <div
                                className="vote-bar"
                                style={{
                                    width: `${Math.max((codeA_votes / maxVotes) * 100, 5)}%`
                                }}
                            />
                            <div className="vote-count">{json.voteResults.CodeA || 0}</div>
                        </div>
                        {json.voteResults.CodeA === Math.max(...Object.values(json.voteResults)) && (
                            <div className="winner-tag">Winner 🏆</div>
                        )}
                    </div>}
            </div>

            <div className="code-row">
                <div className="code-block">
                    <Highlight className="java">
                        {json.CodeB}
                    </Highlight>
                </div>
                {showVoteButtons && (
                    <div className="vote-button-wrapper">
                        <button className="vote-button" onClick={() => handleVote("CodeB")}>
                            I like this the best
                        </button>
                        {votedText === "CodeB" && (
                            <div className="voted-emoji-heart">
                                <div className="voted-heart">❤️</div>
                                <div className="voted-thumbs">👍</div>
                            </div>
                        )}
                    </div>
                )}
                {showResults && <div className="vote-result">
                    <div className="vote-bar-wrapper">
                        <div
                            className="vote-bar"
                            style={{
                                width: `${Math.max((codeB_votes / maxVotes) * 100, 5)}%`
                            }}
                        />
                        <div className="vote-count">{json.voteResults.CodeB || 0}</div>
                    </div>
                    {json.voteResults.CodeB === Math.max(...Object.values(json.voteResults)) && (
                        <div className="winner-tag">Winner 🏆</div>
                    )}
                </div>}
            </div>
        </>
    );
};

export default CodePage;