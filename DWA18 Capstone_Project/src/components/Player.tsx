import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { styled } from '@mui/material/styles';


const PlayerStyle = styled('div')({
  backgroundColor: '#F2F2F2',
  marginTop: '5px',
  marginLeft: '5px',
})

export default function Player(props) {
  const { title, description, episode, file, id } = props
  const [paused, setPaused] = React.useState(true);

  const togglePause = () => {
    setPaused(!paused)
  }

  return (
    <PlayerStyle>
      <audio src={file}></audio>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {`Episode ${episode}: ${title}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {description}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={togglePause}
            >
              {paused ? (
                <PlayArrowRounded
                  sx={{ fontSize: '3rem' }}
                />
              ) : (
                <PauseRounded sx={{ fontSize: '3rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>
      </Card>
    </PlayerStyle>
  );
}