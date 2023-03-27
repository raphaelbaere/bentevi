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
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../../styles/SignUp.css';

function Copyright(props) {
  return (
    <footer>
      <Typography
        sx={{width: '100%'}}
        variant="body2"
        color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        Raphael Baere
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <div id="icon-div">
        <a href="https://github.com/raphaelbaere/bentevi"
          rel="noreferrer"
          target="_blank">
          <GitHubIcon fontSize="large" />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://linkedin.com/in/raphael-baere">
          <LinkedInIcon fontSize="large"/>
        </a>
      </div>
    </footer>
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
  const [errorState, setErrorState] = React.useState({
    firstName: {
      error: false,
      errorMessage: '',
    },
    lastName: {
      error: false,
      errorMessage: '',
    },
    email: {
      error: false,
      errorMessage: '',
    },
    password: {
      error: false,
      errorMessage: '',
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const verifyName = () => {
    if (!state.firstName) {
      setErrorState({
        ...errorState,
        firstName: {
          error: true,
          errorMessage: 'O campo "Nome" é obrigatório e não pode estar vazio.',
        },
      });
      throw new Error(errorState.firstName.errorMessage);
    }
    if (!state.lastName) {
      setErrorState({
        ...errorState,
        lastName: {
          error: true,
          errorMessage: `O campo "Sobrenome"
           é obrigatório e não pode estar vazio.`,
        },
      });
      throw new Error(errorState.lastName.errorMessage);
    }
  };

  const verifyEmail = () => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!state.email) {
      setErrorState({
        ...errorState,
        email: {
          error: true,
          errorMessage: 'O campo "Email" é obrigatório e não pode estar vazio.',
        },
      });
      throw new Error(errorState.email.errorMessage);
    };
    if (!regexEmail.test(state.email)) {
      setErrorState({
        ...errorState,
        email: {
          error: true,
          errorMessage: `O campo "Email"
           deve conter um email no formato correto.`,
        },
      });
      throw new Error(errorState.email.errorMessage);
    }
    return true;
  };
  const verifyPassword = () => {
    if (!state.password) {
      setErrorState({
        ...errorState,
        password: {
          error: true,
          errorMessage: 'O campo "Senha" é obrigatório e não pode estar vazio.',
        },
      });
      throw new Error(errorState.password.errorMessage);
    }
    return true;
  };
  const verifyUser = () => {
    try {
      verifyName();
      verifyEmail();
      verifyPassword();
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
    return false;
  };
  const handleSignUp = () => {
    const user = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
    };
    localStorage.setItem('user', JSON.stringify(user));
    verifyUser();
  };
  const handleChange = ({target}) => {
    setErrorState({
      ...errorState,
      [target.name]: {
        error: false,
        errorMessage: '',
      },
    });
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
      <Container component="main"
        maxWidth="xs" sx={{marginTop: '40px',
          paddingBottom: '20px', backgroundColor: 'white'}}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{bgcolor: 'blue'}}>
            <FlutterDashIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  error={errorState.firstName.error}
                  helperText={errorState.firstName.errorMessage}
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
                  error={errorState.lastName.error}
                  helperText={errorState.lastName.errorMessage}
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
                  error={errorState.email.error}
                  helperText={errorState.email.errorMessage}
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
                  error={errorState.password.error}
                  helperText={errorState.password.errorMessage}
                  label="Senha"
                  type="password"
                  id="password"
                  value={state.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={handleSignUp}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Copyright sx={{mt: 5}} />
      </Container>
    </ThemeProvider>
  );
}
