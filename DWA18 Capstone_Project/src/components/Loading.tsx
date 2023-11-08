import * as React from 'react';
import { styled } from '@mui/system';

const MainLoading = styled('div')({
    width: '100%',
    marginTop: '100px',
    left: 0,
});

export default function LoadingBar() {
    return (
        <MainLoading>
            <h1>Loading...</h1>
        </MainLoading>
    )
}