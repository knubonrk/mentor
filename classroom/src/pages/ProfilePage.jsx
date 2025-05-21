import {useState, useEffect} from "react";

function ProfileSetupPage({ profileSetCallback }) {
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState({category1: '', category2: '', category3: ''});

    useEffect(() => {
        async function fetchSuggestions() {
            try {
                const response = await fetch('http://127.0.0.1:8080/api/profile/suggestions');
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data.suggestions);
                }
            } catch (error) {
                console.error('Failed to fetch suggestions:', error);
            }
        }

        fetchSuggestions();
    }, []);

    const handleSaveProfile = () => {
        if (selected.category1 && selected.category2 && selected.category3) {
            const nickname = `${selected.category1} ${selected.category2} ${selected.category3}`;
            localStorage.setItem('nickname', nickname);
            profileSetCallback();

        }
        // Redirect to welcome page or any other desired page
    };

    return (
        <div>
            <h1>Mentor</h1>
            <p>Welcome! Pick your nick name:</p>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {suggestions.map((category, index) => (
                    <div key={index} style={{margin: '10px'}}>
                        {category.map((suggestion, idx) => (
                            <div key={idx}>
                                <input
                                    type="radio"
                                    name={`category${index + 1}`}
                                    id={suggestion}
                                    value={suggestion}
                                    checked={selected[`category${index + 1}`] === suggestion}
                                    onChange={(e) => setSelected({
                                        ...selected,
                                        [`category${index + 1}`]: e.target.value
                                    })}
                                />
                                <label
                                    htmlFor={suggestion}>{suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleSaveProfile}>Let's go</button>
        </div>
    );
}

export default ProfileSetupPage;
