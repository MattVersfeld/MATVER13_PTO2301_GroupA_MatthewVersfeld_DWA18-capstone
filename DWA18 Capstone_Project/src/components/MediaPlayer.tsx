import * as React from 'react';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const MediaCardStyle = styled(Card)({
    display: 'flex',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    zIndex: 100,
    bottom: 10,
    right: 10,

})

const Test = styled('div')({
    position: 'relative',
})

export default function MediaPlayer(props) {
    const { title, file, image } = props
    const theme = useTheme();


    return (
        <Test>
            <MediaCardStyle sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', color: 'white' }}>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography> */}
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon sx={{ color: 'white' }} /> : <SkipPreviousIcon sx={{ color: 'white' }} />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38, color: 'white' }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon sx={{ color: 'white' }} /> : <SkipNextIcon sx={{ color: 'white' }} />}
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={image}
                    alt="Cover"
                />
            </MediaCardStyle>
        </Test>
    );
}