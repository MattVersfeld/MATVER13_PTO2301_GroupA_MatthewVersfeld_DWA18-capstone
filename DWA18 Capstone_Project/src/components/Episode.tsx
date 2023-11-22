import { styled } from '@mui/system';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Player from './Player';
import generateCode from '../utils/keygen';
import BackButton from './BackButton';

const EpisodeWrapper = styled('div')({
    border: 'solid black 1px',
    width: '99%',
    marginTop: '50px',
    marginLeft: '5px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F2F2F2',
    borderRadius: '5px',
});

const ImageStyle = styled('img')({
    maxWidth: '450px',
    height: '100%',
    marginLeft: '5px',
    border: 'black solid 1px',
})

const EpisodeContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',

})

const TitleInfo = styled('div')({
    marginLeft: '5px',
})

const UpdatedInfo = styled('div')({
    marginLeft: '5px',
})

const EpisodeInfo = styled('div')({
    display: 'grid',
    maxHeight: '550px',
    gridTemplateRows: '0.2fr 3fr',
    overflow: 'scroll'
})

const SeasonList = styled('div')({
    marginBottom: '2px',
    marginLeft: '5px',
})

const BacktitleStyle = styled('div')({
    display: 'flex',
    padding: '5px',
})

const Title = styled('h1')({
    marginRight: 'auto',
})





export default function Episode(props) {
    const { id, title, description, genres, seasons, image, updated, phase } = props

    const [episodeState, setEpisodeState] = React.useState({
        season: '',
        list: '',
        displayEpisodes: [],
        displayImgage: '',
    })

    console.log(genres)
    const date = new Date(updated)
    const readableDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    React.useEffect(() => {
        setEpisodeState((prevState) => ({
            ...prevState,
            list: seasons.map((item) =>
                <MenuItem key={generateCode(16)} value={item.season}>{item.season}</MenuItem>),
        }))
    }, [episodeState.season])


    const handleChange = (event) => {
        setEpisodeState(prevState => ({
            ...prevState,
            season: event.target.value,
            displayEpisodes: seasons[event.target.value - 1].episodes,
            displayImgage: seasons[event.target.value - 1].image
        }));
    };

    const displayPlayer = (props) => {
        if (props.length === 0) {
            return <div>Please Select a season</div>
        } else {
            return (
                props.map((item) => (
                    <Player
                        key={generateCode(16)}
                        id={generateCode(3)}
                        title={item.title}
                        description={item.description}
                        episode={item.episode}
                        file={item.file}
                    />
                ))
            )

        }
    }



    const displayList = displayPlayer(episodeState.displayEpisodes)

    return (
        <EpisodeWrapper>
            <TitleInfo>
                <BacktitleStyle>
                    <Title>{title}</Title>
                    <BackButton
                        phase={phase}
                    />
                </BacktitleStyle>

                <p>{description}</p>
            </TitleInfo>
            <SeasonList>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel>Season</InputLabel>
                        <Select
                            value={episodeState.season}
                            label="Seasons"
                            onChange={handleChange}
                        >
                            {episodeState.list}
                        </Select>
                    </FormControl>
                </Box>
            </SeasonList>
            <EpisodeContainer>
                <ImageStyle src={episodeState.displayImgage === '' ? image : episodeState.displayImgage} alt='season image' />
                <EpisodeInfo>
                    {displayList}
                </EpisodeInfo>
            </EpisodeContainer>
            <UpdatedInfo>
                <p>{`Last updated: ${readableDate}`}</p>
            </UpdatedInfo>
        </EpisodeWrapper>
    )
}