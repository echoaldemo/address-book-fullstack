import React, { useState } from 'react';
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Background from '../../assets/images/background.png'
import Navbar from './navBar'
import axios from 'axios'
import Toast from './Toast'
import withWidth from '@material-ui/core/withWidth'
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
  },
  rootMd: {
    minHeight: '90vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${Background})`,
    '@media (max-width: 954px)' : {
      minHeight: '80vh', 
    }
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
  lightText: {
    color: '#bababa'
  },
  mdContainer: {
    margin: '30px auto', 
    minHeight: '65vh', 
    backgroundColor: 'transparent', 
    color: '#bababa', 
  }
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#44abd4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#44abd4',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#bababa',
      },
      '&:hover fieldset': {
        borderColor: '#697ad6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#44abd4',
      },
    },
  },
})(TextField);

function Home(props) {
  const { width } = props;
  const classes = useStyles();
  let [ first_name, setFirst ] = useState('');
  let [ last_name, setLast ] = useState('');
  let [ username, setUser ] = useState('');
  let [ email, setEmail ] = useState('');
  let [ password, setPass ] = useState('');
  let [ firstError, setFirstError ] = useState(false);
  let [ lastError, setLastError ] = useState(false);
  let [ userError, setUserError ] = useState(false);
  let [ emailError, setEmailError ] = useState(false);
  let [ passError, setPassError ] = useState(false);
  let [open, setOpen] = useState(false);
  let [success, setSuccess] = useState(false);
  let [message, setMessage] = useState('');
  const [checked, setChecked] = React.useState(false);
  
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

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function handleChange() {
    setChecked(prev => !prev);
  }

  function submitHandler(e) {
    e.preventDefault()
    const state = {
      username,
      email,
      password,
      first_name,
      last_name
    }
    axios.post(process.env.REACT_APP_BASE_URL + '/api/users/register', state)
    .then(response => {
      setMessage('Succesfully registered!')
      setSuccess(true)
      setOpen(true);
      props.history.push('/contacts');
    })
    .catch(error => {
      setMessage('Username is already taken! Please enter another one.')
      setSuccess(false)
      setOpen(true)
      console.error(error)
    })
  }

  return (
    <div>
      <Navbar handleChange={handleChange}/>
      <Fade in={checked}>
      <Grid container component="main" className={width === 'lg' || width === 'xl' ? classes.root : classes.rootMd}>
        <CssBaseline />
        {width === 'lg' || width === 'xl'
        ? <Grid item xs={false} sm={4} md={7 } className={classes.image} />
        : null
        }
        <Grid className={width === 'lg' || width === 'xl' ? "" : classes.mdContainer }
	       item xs={12} sm={8} md={6} lg={5} component={Box} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a New Account
            </Typography>
            <form className={classes.form} onSubmit={submitHandler}>
              <Grid container spacing={width === 'xs' ? 0 : 3}>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    label="First Name"
                    onChange={e => updateFirst(e.target.value)}
                    onBlur={e => updateFirst(e.target.value)}
                    error={firstError}
                    helperText={firstError ? 'First name is required!' : null}
                    InputLabelProps={{
                      className: classes.lightText,
                    }}
                    InputProps={{
                      className: classes.lightText
                    }}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    onChange={e => updateLast(e.target.value)}
                    onBlur={e => updateLast(e.target.value)}
                    error={lastError}
                    helperText={lastError ? 'Last name is required!' : null}
                    InputLabelProps={{
                      className: classes.lightText,
                    }}
                    InputProps={{
                      className: classes.lightText
                    }}
                  />
                </Grid>
              </Grid>

              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                onChange={e => updateUser(e.target.value)}
                onBlur={e => updateUser(e.target.value)}
                error={userError}
                helperText={userError ? 'Username is required!' : null}
                InputLabelProps={{
                      className: classes.lightText,
                }}
                InputProps={{
                  className: classes.lightText
                }}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                onChange={e => updateEmail(e.target.value)}
                onBlur={e => updateEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Email address is required!' : null}
                InputLabelProps={{
                  className: classes.lightText,
                }}
                InputProps={{
                  className: classes.lightText
                }}
              />
              <CssTextField
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
                InputLabelProps={{
                  className: classes.lightText,
                }}
                InputProps={{
                  className: classes.lightText
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
      </Fade>
      <Toast open={open} handleClose={handleClose} success={success} message={message} />
    </div>
  );
}
export default withRouter(withWidth()(Home));
