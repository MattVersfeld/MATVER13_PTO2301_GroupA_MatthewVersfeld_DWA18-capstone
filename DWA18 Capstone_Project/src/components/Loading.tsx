import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const MainLoading = styled('div')({
    width: '100%',
    marginTop: '100px',
    left: 0,
});

export default function LoadingBar() {
    return (
        <MainLoading>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </MainLoading>

    );
}