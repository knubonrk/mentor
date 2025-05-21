import { useEffect, useState } from 'react';
import Avatar from '../components/Avatar';

function Header() {
    const [nickname, setNickname] = useState('');
    const [avatarStyle, setAvatarStyle] = useState('lorelei');

    useEffect(() => {
        setNickname(localStorage.getItem('nickname') || 'Guest');
        setAvatarStyle(localStorage.getItem('avatarStyle') || 'lorelei');
    }, [localStorage.getItem("nickname"),  localStorage.getItem('avatarStyle')]);

    return (
        <header style={{
            width: '100%',
            backgroundColor: '#222',
            padding: '10px 20px',
            boxSizing: 'border-box',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '10px',
                color: 'white'
            }}>
                <h3 style={{ margin: 0 }}>{nickname}</h3>
                <Avatar seed={nickname} style={avatarStyle} size={48} />
            </div>
        </header>
    );
}

export default Header;