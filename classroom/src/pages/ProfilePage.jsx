import {useState, useEffect} from "react";
import Avatar from '../components/Avatar';

const avatarStyles = ["lorelei", "adventurer", "icons", "micah", "pixelArtNeutral", "thumbs"];

function ProfileSetupPage({ profileSetCallback }) {
    const [suggestions, setSuggestions] = useState([]);
    const [selected, setSelected] = useState({
        category1: '',
        category2: '',
        category3: ''
    });
    const [selectedAvatar, setSelectedAvatar] = useState('lorelei');

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
        const {category1, category2, category3} = selected;
        if (category1 && category2 && category3) {
            const nickname = `${category1} ${category2} ${category3}`;
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('avatarStyle', selectedAvatar);
            profileSetCallback();
        }
    };

    const fullSeed = `${selected.category1} ${selected.category2} ${selected.category3}`;

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Mentor</h1>
            <p>Welcome! Pick your nickname by choosing one from each column:</p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '2em'}}>
                {suggestions.map((category, index) => (
                    <div key={index}>
                        {category.map((suggestion, idx) => (
                            <div key={idx} style={{textAlign: 'left'}}>
                                <input
                                    type="radio"
                                    name={`category${index + 1}`}
                                    id={`${index}-${suggestion}`}
                                    value={suggestion}
                                    checked={selected[`category${index + 1}`] === suggestion}
                                    onChange={(e) =>
                                        setSelected({
                                            ...selected,
                                            [`category${index + 1}`]: e.target.value,
                                        })
                                    }
                                />
                                <label htmlFor={`${index}-${suggestion}`}>
                                    {suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <h3>Then select an Avatar...</h3>
            <div style={{display: 'flex', justifyContent: 'center', gap: '2em', margin: '20px 0'}}>
                {avatarStyles.map((style) => (
                    <label key={style} style={{cursor: 'pointer', textAlign: 'center'}}>
                        <input
                            type="radio"
                            name="avatarStyle"
                            value={style}
                            checked={selectedAvatar === style}
                            onChange={() => setSelectedAvatar(style)}
                            style={{display: 'none'}}
                        />
                        <div
                            style={{
                                border: selectedAvatar === style ? '2px solid #4caf50' : '2px solid transparent',
                                borderRadius: '8px',
                                padding: '4px'
                            }}
                        >
                            <Avatar style={style} seed={fullSeed} size={72}/>
                            <div style={{color: '#999', marginTop: '4px'}}>{style}</div>
                        </div>
                    </label>
                ))}
            </div>

            <div style={{textAlign: "center"}}>
                <button onClick={handleSaveProfile}>Let's go</button>
            </div>
        </div>
    );
}

export default ProfileSetupPage;