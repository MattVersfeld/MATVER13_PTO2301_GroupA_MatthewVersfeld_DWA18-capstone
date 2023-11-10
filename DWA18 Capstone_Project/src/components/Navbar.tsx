import * as React from 'react';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';

const TopNav = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    top: 0,
    left: 0,
});

const NavAvatar = styled(Avatar)({
    marginLeft: '2rem',
})

const NavTitle = styled('h1')({
    marginLeft: '20px',
})

export default function Navbar() {
    return (
        <TopNav>
            <NavAvatar
                alt="Remy Sharp"
                src="./src/assests/NavAvatar.jpg"
            />
            <NavTitle>Let's Talk Podcasts</NavTitle>
        </TopNav>
    )
}