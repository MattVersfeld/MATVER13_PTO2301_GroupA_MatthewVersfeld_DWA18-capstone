import * as React from 'react';
import { styled } from '@mui/system';

const TopNav = styled('div')({
    width: '100%',
    position: 'fixed',
    backgroundColor: '#5A5A5A',
    color: 'white',
    top: 0,
    left: 0,
    // boxShadow: '0px 10px 10px -5px rgba(0,0,0,0.69)',
    // WebkitBoxShadow: '0px 10px 10px -5px rgba(0,0,0,0.69)',
    // MozBoxShadow: '0px 10px 10px -5px rgba(0,0,0,0.69)',
});

export default function Navbar() {
    return (
        <TopNav>
            <h1>Nav content goes here</h1>
        </TopNav>
    )
}