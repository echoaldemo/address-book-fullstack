import React, { useState } from 'react';
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
import withWidth from '@material-ui/core/withWidth'
import { Redirect } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
  },
  rootMd: {
    minHeight: '90vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${Background})`,
    '@media (max-width: 954px)' : {
      minHeight: '77vh', 
    },
    '@media (max-width: 600px)' : {
      minHeight: '100vh'
    },
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
    '@media (max-width: 600px)' : {
      margin: '40px 32px 0 32px'
    },
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
    '@media (max-width: 600px)' : {
      margin: '0'
    },
  },
  returnBtn: {
    display: 'none',
    textTransform: 'none',
    '@media (max-width: 600px)' : {
      display: 'block'
    },
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

  function register(e) {
    e.preventDefault()
    const state = {
      username,
      email,
      password,
      first_name,
      last_name
    }
    props.submit(state)
  }


  return (
      <Grid container component="main" className={width === 'lg' || width === 'xl' ? classes.root : classes.rootMd} style={!props.hide ? { display: 'none' } : {}}>
        <CssBaseline />
        {width === 'lg' || width === 'xl'
        ? <Grid item xs={false} sm={4} md={7 } className={classes.image} />
        : null
        }
        <Grid className={width === 'lg' || width === 'xl' ? "" : classes.mdContainer }
	       item xs={12} sm={8} md={6} lg={5} component={Box}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a New Account
            </Typography>
            <form className={classes.form} onSubmit={register}>
              <Grid container spacing={width === 'xs' ? 0 : 3}>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    key={width}
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
               <Button
                onClick={props.handleChange}
                color="inherit" 
                className={classes.returnBtn} 
                >
                 Return to Login Page
              </Button>
            </form>
          </div>
        </Grid>
      </Grid> 
  );
}
export default withWidth()(Home);
