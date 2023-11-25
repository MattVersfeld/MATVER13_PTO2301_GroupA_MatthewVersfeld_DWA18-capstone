import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
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
    const theme = useTheme();

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