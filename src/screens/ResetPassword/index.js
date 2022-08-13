import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import arabic from '../../languages/arabic';
import english from '../../languages/english';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

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

export default function SignInSide() {

  const navigate = useNavigate();

  const count = useSelector((state) => state.signIn.value);
  const dispatch = useDispatch();
  const [lang,setLang] = React.useState('ar');
  const [isLoading,setIsloading]= useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [successMessage,setSuccessMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsloading(true);

    const data = new FormData(event.currentTarget);

    console.log('data',data.get('password'));
    console.log('data',data.get('confirmpassword'));

    axios.post(`https://home-ems.herokuapp.com/api/reset?email=${localStorage.getItem('saved_email')}&password=${data.get('password')}&password_confirmation=${data.get('confirmpassword')}`)
    .then(data => {
      console.log('data from login',data.data);
      setSuccessMessage('Your password has been changed successfully')
      
      setTimeout(() => {
        navigate('/signin');
      },3000)

    })
    .catch(error => {
    //   setErrorMessage('Invalid email address')
      console.log('erro while logging in', error);

      setTimeout(() =>{
        setErrorMessage(null);
      },3000)

    })
    .finally(() => {
      setIsloading(false);
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.showhouse.co.uk/wp-content/uploads/2018/09/Nearly-half-of-Brits-covet-smart-security-systems.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {'Enter your new password'}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={"New password"}
                type="password"
                id="password"
                autoComplete="new-password"
              />

                <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label={'confirm new Password'}
                type="password"
                id="cnofirmpassword"
                autoComplete="new-password"
              />
             
              {
                !isLoading ?
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              {
                'Reset password'
              }
            </Button>
            : <CircularProgress color="secondary" />
            }

            {
            errorMessage && <h2>{errorMessage}</h2>
            }

            {
              successMessage && <h2>{successMessage}</h2>
            }

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  {/* <Link href="/signup" variant="body2">
                    {lang == 'ar' ? arabic.signInPage.donthaveAccount : english.signInPage.donthaveAccount}
                  </Link> */}
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}