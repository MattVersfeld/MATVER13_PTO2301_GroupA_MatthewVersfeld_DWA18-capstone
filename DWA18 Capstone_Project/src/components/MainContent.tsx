import * as React from 'react';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MainContent = styled('div')({
    width: '100%',
    marginTop: '100px',
    marginLeft: '50px'
});

export default function Main(props: {
    id: string
    title: string
    description: string
    seasons: number
    image: string
    genres: number[]
    updated: string
}) {
    const { title, description, image, updated } = props

    return (
        <MainContent>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={updated}
                />
                <CardMedia
                    component="img"
                    image={image}
                    alt="Image goes here"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </MainContent>
    )
}