// @ts-nocheck
import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MediaCardStyle = styled(Card)({
    display: 'flex',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    zIndex: 100,
    bottom: 10,
    right: 10,

})

const AudioWrapper = styled('div')({
    position: 'relative',
})

export default function MediaPlayer(props) {
    const { title, file, image } = props


    /*
    * This useEffect hook is responsible for setting up and cleaning up an event listener
    * for the 'beforeunload' event. The purpose is to prevent accidental page reloads or
    * tab closures by prompting the user with a confirmation message.

    * Steps:
    * 1. Define the 'handleBeforeUnload' function, which prevents the default behavior
    *  of the 'beforeunload' event.
    * 2. Attach the 'handleBeforeUnload' function as an event listener to the 'beforeunload' event.
    * 3. Return a cleanup function within the useEffect hook to remove the event listener
    *  when the component unmounts or when the dependency array is empty.

    * Note:
    * - The empty dependency array '[]' indicates that this effect should only run once
    * when the component mounts, and the cleanup should be performed when the component unmounts.
    * - The purpose of preventing the default behavior on 'beforeunload' is to prompt the user
    * with a confirmation dialog when attempting to leave the page or close the tab.
    */
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <AudioWrapper>
            <MediaCardStyle sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', color: 'white' }}>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">

                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <div>
                            <audio
                                src={file}
                                controls
                            />
                        </div>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={image}
                    alt="Cover"
                />
            </MediaCardStyle>
        </AudioWrapper>
    );
}