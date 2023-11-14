import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import { styled } from '@mui/material';

const ButtonStyle = styled(Button)({
    color: 'black',
    border: 'none'
})

const StackStyle = styled(Stack)({
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center'
})

export default function SortingButtons(props) {
    const { up, down, reset } = props

    return (
        <StackStyle direction="row" spacing={2}>
            <ButtonStyle onClick={up} variant="outlined" startIcon={<ArrowUpwardIcon />}>
                Sort A-Z
            </ButtonStyle>
            <ButtonStyle onClick={down} variant="outlined" startIcon={<ArrowDownwardIcon />}>
                Sort Z-A
            </ButtonStyle>
            <ButtonStyle variant="outlined" startIcon={<TodayIcon />}>
                Date recent
            </ButtonStyle>
            <ButtonStyle variant="outlined" startIcon={<EventIcon />}>
                Date oldest
            </ButtonStyle>
            <ButtonStyle onClick={reset} variant="outlined" startIcon={<AutoFixHighIcon />}>
                Reset
            </ButtonStyle>
        </StackStyle>
    );
}