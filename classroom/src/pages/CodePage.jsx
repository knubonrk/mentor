import Highlight from 'react-highlight';
import "highlight.js/styles/stackoverflow-light.css";
import './CodePage.css';
import PropTypes from 'prop-types';

const CodePage = ({ json, sendJsonMessage }) => {
    const handleVote = (choice) => {
        sendJsonMessage({ type: "vote", vote: choice, code: json.code });
    };

    const showVoteButtons = json.vote === "true";

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
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CodePage;

CodePage.propTypes = {
    json: PropTypes.shape({
        CodeA: PropTypes.string.isRequired,
        CodeB: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        vote: PropTypes.bool
    }).isRequired,
    sendJsonMessage: PropTypes.func.isRequired
};