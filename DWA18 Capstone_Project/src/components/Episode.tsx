import { styled } from '@mui/system';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EpisodePlayer from './EpisodePlayer';
import LoadingBar from './Loading';

const EpisodeWrapper = styled('div')({
    border: 'solid black 1px',
    width: '75vw',
    marginTop: '100px',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
    borderRadius: '2%',
});

const ImageStyle = styled('img')({
    maxWidth: '450px',
})

const EpisodeContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
})

const EpisodeInfo = styled('div')({
    display: 'grid',
    gridTemplateRows: '0.2fr 3fr',
})

export default function Episode(props) {
    const { id, title, description, genres, seasons, image, updated } = props

    const [season, setSeason] = React.useState('');
    const [list, setList] = React.useState(seasons.map(
        (item) => <MenuItem key={item.season + 1} value={item.season}>{item.season}</MenuItem>
    ))
    const [episodes, setEpisodes] = React.useState([])

    const handleChange = (event) => {
        setSeason(event.target.value);
        setEpisodes(seasons[event.target.value - 1])
    };

    return (
        <EpisodeWrapper>
            <h1>{title}</h1>
            <EpisodeContainer>
                <ImageStyle src={image} alt="this is an image" />
                <EpisodeInfo>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel>Season</InputLabel>
                            <Select
                                value={season}
                                label="Seasons"
                                onChange={handleChange}
                            >
                                {list}
                            </Select>
                        </FormControl>
                        <LoadingBar />
                    </Box>
                </EpisodeInfo>
            </EpisodeContainer>

            <p>{description}</p>
            <p>{updated}</p>
        </EpisodeWrapper>
    )
}