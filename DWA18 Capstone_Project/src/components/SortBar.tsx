import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { styled } from '@mui/material';




const SortStyle = styled('div')({
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
})


export default function SortBar() {


    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <SortStyle role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {/* <Typography color="text.primary">Sort Shows:</Typography> */}
                <Link underline="hover" color="inherit" href="/">
                    Sort A - Z
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Sort Z - A
                </Link>

            </Breadcrumbs>
        </SortStyle>
    );
}