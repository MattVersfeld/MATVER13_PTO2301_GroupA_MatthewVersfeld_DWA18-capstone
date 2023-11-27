import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material';

const ButtonStyle = styled(Button)({
    border: 'none',
    color: 'black'
})
// @ts-expect-error
export default function BackButton(props) {
    const { phase } = props
    return (
        <Stack direction="row" spacing={2}>
            <ButtonStyle onClick={phase} variant="outlined" startIcon={<ArrowBackIosIcon />}>
                Back
            </ButtonStyle>
        </Stack>
    );
}