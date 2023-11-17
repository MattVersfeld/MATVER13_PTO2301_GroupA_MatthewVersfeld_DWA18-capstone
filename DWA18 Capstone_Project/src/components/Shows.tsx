import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ShowPreview = styled('div')({
    width: '100%',
    marginTop: '30px',
    marginLeft: '50px',
    textAlign: 'center',
    justifyContent: 'space - evenly',
});

const CardStyle = styled(Card)({
    backgroundColor: '#F2F2F2',
    border: 'solid black 1px'
})

const IconStyle = styled(FavoriteIcon)({
    color: '#42adf5',
})

export default function Shows(props: {
    id: string;
    key: string
    title: string;
    description: string;
    seasons: number;
    image: string;
    updated: string;
    episodeChange: any;
}[]) {
    const [expanded, setExpanded] = React.useState(false);
    const { title, description, image, updated, seasons, episodeChange, id, toggleFav, isFav } = props


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    return (
        <ShowPreview>
            <CardStyle sx={{ maxWidth: 345 }}>
                <CardHeader
                    action={
                        <IconButton aria-label="forward" onClick={() => episodeChange(id)}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={''}
                />
                <CardMedia
                    component="img"
                    image={image}
                    alt="Podcast Image"
                />
                <CardActions disableSpacing>
                    {isFav ? <IconButton onClick={() => toggleFav(id)} aria-label="add to favorites" >
                        <IconStyle />
                    </IconButton> : <IconButton onClick={() => toggleFav(id)} aria-label="add to favorites" >
                        <FavoriteIcon />
                    </IconButton>}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Seasons: {seasons}</Typography>
                        <Typography paragraph>Summary:</Typography>
                        <Typography paragraph>
                            {description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardStyle>
        </ShowPreview>
    );
}
