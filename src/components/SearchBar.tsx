import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// @ts-expect-error
export default function SearchBar(props) {
    const { search } = props
    return (

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField
                onChange={search}
                color='info'
                id="standard-basic"
                label="Search"
                variant="standard"
                onSubmit={search}
            />
        </Box>
    );
}