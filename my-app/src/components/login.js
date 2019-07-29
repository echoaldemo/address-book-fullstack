import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../assets/images/background.png'
import Navbar from './navBar'

const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${Background})`,    
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
      backgroundColor: '#3f51b5',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  let [ firstName, setFirst ] = useState('');
  let [ lastName, setLast ] = useState('');
  let [ username, setUser ] = useState('');
  let [ email, setEmail ] = useState('');
  let [ password, setPass ] = useState('');
  let [ firstError, setFirstError ] = useState(false);
  let [ lastError, setLastError ] = useState(false);
  let [ userError, setUserError ] = useState(false);
  let [ emailError, setEmailError ] = useState(false);
  let [ passError, setPassError ] = useState(false);
  
  function updateUser(string){
    if (string.length > 0){
      setUser(string)
      setUserError(false)
    }
    else setUserError(true)
  }

  function updateFirst(string) {
    if (string.length > 0) {
      setFirst(string)
      setFirstError(false)
    }
    else setFirstError(true)
  }

  function updateLast(string) {
    if (string.length > 0) {
      setLast(string)
      setLastError(false)
    }
    else setLastError(true)
  }

  function updatePass(string){
    if (string.length > 0) {
      setPass(string)
      setPassError(false)
    }
    else setPassError(true)
  }

  function updateEmail(string) {
    if (string.length > 0) {
      setEmail(string)
      setEmailError(false)
    }
    else setEmailError(true)
  }

    return (
      <div>
    <Navbar />
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a New Account
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="First Name"
                  onChange={e => updateFirst(e.target.value)}
                  onBlur={e => updateFirst(e.target.value)}
                  error={firstError}
                  helperText={firstError ? 'First name is required!' : null}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="Last Name"
                  onChange={e => updateLast(e.target.value)}
                  onBlur={e => updateLast(e.target.value)}
                  error={lastError}
                  helperText={lastError ? 'Last name is required!' : null}
                />
              </Grid>
            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              onChange={e => updateUser(e.target.value)}
              onBlur={e => updateUser(e.target.value)}
              error={userError}
              helperText={userError ? 'Username is required!' : null}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              onChange={e => updateEmail(e.target.value)}
              onBlur={e => updateEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? 'Email address is required!' : null}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              onChange={e => updatePass(e.target.value)}
              onBlur={e => updatePass(e.target.value)}
              error={passError}
              helperText={passError ? 'Password is required!' : null}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
      </div>
  );
}
