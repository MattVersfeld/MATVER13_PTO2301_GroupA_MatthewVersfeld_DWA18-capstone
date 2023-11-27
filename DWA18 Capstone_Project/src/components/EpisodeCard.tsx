import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const CardWrapper = styled('div')({
  display: 'flex',
  width: '100%',
})

export default function EpisodeCard(props) {
  const { title, description, episode, file, media, image } = props

  return (
    <CardWrapper>
      <Card sx={{
        width: '100%',
        border: 'solid #d3d3d3 1px',
        backgroundColor: '#F2F2F2',
      }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Episode ${episode}: ${title}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => media(file, image, title)} size="small">Add</Button>
          <Button size="small">Share</Button>
          <audio
            src={file}
            controls
          />
        </CardActions>
      </Card>
    </CardWrapper>
  );
}