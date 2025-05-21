import React, { useEffect, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei, adventurer, icons, micah,pixelArtNeutral,thumbs } from '@dicebear/collection';

// Map the available styles to the corresponding Dicebear collections
const avatarCollections = {
    lorelei,
    adventurer,
    icons,
    micah,
    pixelArtNeutral,
    thumbs
};

function Avatar({ seed, style = 'lorelei', size = 64 }) {
    const [svg, setSvg] = useState('');

    useEffect(() => {
        const collection = avatarCollections[style] || lorelei;
        const avatar = createAvatar(collection, {
            seed,
            size,
            backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
        });
        setSvg(avatar.toString());
    }, [seed, style, size]);

    return (
        <a
            href="https://www.dicebear.com/licenses/"
            target="_blank"
            rel="noopener noreferrer"
            style={{textDecoration: 'none', color: 'inherit', display: 'inline-block'}}
        >
            <div
                style={{width: size, height: size}}
                dangerouslySetInnerHTML={{__html: svg}}
            />
        </a>
    );
}

export default Avatar;