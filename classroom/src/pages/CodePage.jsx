import Highlight from 'react-highlight';
import {useState} from "react";
import "highlight.js/styles/stackoverflow-light.css";
import './CodePage.css';

const CodePage = ({ json, sendJsonMessage }) => {
    const [votedText, setVotedText] = useState(null);


    const handleVote = (choice) => {
        sendJsonMessage({ type: "vote", key: choice, data: json.code });

        setVotedText(choice);
        setTimeout(() => setVotedText(null), 1000); // remove after 1s

    };

    const showVoteButtons = json.voteState === "vote";

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
                        {votedText === "CodeA" && <div className="voted-emoji-heart">
                            <div className="voted-heart">❤️</div>
                            <div className="voted-thumbs">👍</div>
                        </div>}

                    </div>
                )}
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
                            {votedText === "CodeB" && <div className="voted-emoji-heart">
                                <div className="voted-heart">❤️</div>
                                <div className="voted-thumbs">👍</div>
                            </div>}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CodePage;

