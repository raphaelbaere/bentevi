/* eslint-disable require-jsdoc */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2"
      color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Bentevi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const handleSignUp = () => {
    const user = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };
  const handleChange = ({target}) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const verifyLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return navigate('/home');
    }
  };

  React.useEffect(() => {
    verifyLogin();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{marginTop: '-80px'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'blue'}}>
            <FlutterDashIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  value={state.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  value={state.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <a href="/home">
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleSignUp}
              >
              Sign Up
              </Button>
            </a>
          </Box>
        </Box>
        <Copyright sx={{mt: 5}} />
      </Container>
    </ThemeProvider>
  );
}