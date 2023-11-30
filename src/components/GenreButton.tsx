// @ts-nocheck
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function GenreButton(props) {
    const { genre, genreSort } = props
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button onClick={() => genreSort(genre)} size="small">{genre}</Button>
            </div>
        </Box>
    );
}