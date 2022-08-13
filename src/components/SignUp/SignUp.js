import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function SignUp() {

  const [isLoading,setIsLoading] = useState(false);
  const [isConfirmingPassword,setIsConfirmingPassword] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (event) => {

    event.preventDefault();

    
    const data = new FormData(event.currentTarget);

    if(data.get('password') != data.get('Confirm-password')){

      setIsConfirmingPassword(false);

      setTimeout(() => {
        setIsConfirmingPassword(true);
      },2000);

    }else {
      // send user data to register
      setIsLoading(true);

      axios.post(`https://home-ems.herokuapp.com/api/register?
      email=${data.get('email')}&
      password=${data.get('password')}&
      password_confirmation=${data.get('Confirm-password')}&
      name=${data.get('Name')}`)
      .then(data => {
        console.log('data from login',data.data);
        // localStorage.setItem('hems_token',data.data.token);
        navigate('/signin');
      })
      .catch(error => {
        console.log('erro while logging in',error);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
    }

    console.log(data.get('Name'));
    console.log(data.get('Confirm-password'));
    console.log(data.get('email'));
    console.log(data.get('password'));

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Your Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirm-password"
                  label="Confirm-password"
                  type="password"
                  id="Confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
              {!isConfirmingPassword && <p>يجب تأكيد كلمة السر</p>}
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
           { !isLoading ? <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            : <CircularProgress sx={{ mt: 3, mb: 2 }} color="secondary" />
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}