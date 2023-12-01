// @ts-nocheck
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';

const SignUpWrapper = styled('div')({
    background: '#FFFFF7',
})

export default function Auth(props) {
    const { phase } = props
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')


    /*
    * This function, 'handleLogin', is an asynchronous function designed to handle
    * user login using Supabase authentication with one-time password (OTP).

    * Parameters:
    * event: The event object, typically from a form submission, to prevent its default behavior.

    * Steps:
    * 1. Prevents the default form submission behavior using 'event.preventDefault()'.
    * 2. Sets the loading state to true to indicate that the login process is in progress.
    * 3. Calls 'supabase.auth.signInWithOtp({ email }, { redirectTo: window.location.origin })'.
    *  - Attempts to sign in the user using the provided email and sends an OTP.
    *  - 'redirectTo' specifies the URL to redirect the user to after successful login.
    * 4. Destructures the response object and checks for an error.
    *  - If an error occurs, displays an alert with the error description or message.
    *  - If successful, alerts the user to check their email for the login link.
    * 5. Sets the loading state back to false to indicate the completion of the login process.
*/
    const handleLogin = async (event) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email }, {
            redirectTo: window.location.origin
        })

        if (error) {
            alert(error.error_description || error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)

    }

    return (
        <SignUpWrapper>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            value={email}
                            required={true}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </Button>
                    </Box>
                </Box>
            </Container >
        </SignUpWrapper>

    )
}