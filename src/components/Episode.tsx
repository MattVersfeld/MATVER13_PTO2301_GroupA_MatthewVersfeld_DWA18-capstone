import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EpisodeCard from './EpisodeCard';
import generateCode from '../utils/keygen';
import BackButton from './BackButton';

const EpisodeWrapper = styled('div')({
    border: 'solid black 1px',
    width: '100%',
    marginTop: '30px',
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

const SelectSeason = styled('div')({
    color: 'red',
    textAlign: 'center',
    fontSize: '20px',
})

// @ts-expect-error
export default function Episode(props) {
    const { showData, handleSeasons, seasonPick, phase, image, loadImage, episodes, description, title, media, updated } = props

    console.log(updated)
    const date = new Date(updated)
    const readableDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    // @ts-expect-error
    const list = showData.seasons.map(item => (
        <MenuItem
            key={generateCode(16)}
            value={item.season}
        >
            {item.season}
        </MenuItem>
    ))
    // @ts-expect-error
    const showEpisodes = episodes.map(item => (
        <EpisodeCard
            key={generateCode(16)}
            title={item.title}
            description={item.description}
            episode={item.episode}
            file={item.file}
            media={media}
            image={image}
        />
    ))

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
                            value={seasonPick}
                            label="Seasons"
                            onChange={handleSeasons}
                        >
                            {list}
                        </Select>
                    </FormControl>
                </Box>
            </SeasonList>
            <EpisodeContainer>
                <ImageStyle src={(image === '') ? loadImage : image} alt='season image' />
                <EpisodeInfo>
                    {(seasonPick === '') ? <SelectSeason>Please select a season</SelectSeason> : showEpisodes}
                </EpisodeInfo>
            </EpisodeContainer>
            <UpdatedInfo>
                <p>{`Show last updated: ${readableDate}`}</p>
            </UpdatedInfo>
        </EpisodeWrapper>
    )
}