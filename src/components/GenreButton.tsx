// @ts-nocheck
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function GenreButton(props) {
    const { genre } = props
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            <div>
                <Button size="small">{genre}</Button>
            </div>
        </Box>
    );
}