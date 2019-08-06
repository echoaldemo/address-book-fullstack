import React, { useState } from 'react';
import { withRouter } from "react-router";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Contacts from '@material-ui/icons/Contacts';
import TextField from '@material-ui/core/TextField';
import Toast from './Toast'
import axios from 'axios'


const useStyles = makeStyles(theme => ({
  appBar: {
    background: 'linear-gradient(83deg, rgba(2,78,83,1) 0%, rgba(0,90,126,1) 31%, rgba(4,1,47,1) 82%)',
    padding: '15px 15px 8px 15px',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    fontFamily: "'Caveat', cursive",
    letterSpacing: '4px',
    flexGrow: 1,
    fontSize: '1.85rem',
  },
  icon: {
    display: 'grid',
    gridTemplateColumns: '0fr 1fr',
    '@media (max-width: 954px)' : {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr',
      justifyItems: 'center'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: '2.5rem'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 0fr',
    '@media (max-width: 600px)' : {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr 1fr',
      justifyItems: 'center'
    },
  },
  username: {
    marginRight: theme.spacing(7),
    marginTop: '0px',
    marginBottom: '0px',
    height: '75px',
    '@media (max-width: 600px)' : {
      width: '60%',
      marginRight: '0px'
    },
  },
  multilineColor: {
    color: '#ffffff9c',
    "&:before": {
        borderBottom: '1px solid rgba(255, 255, 255, 0.42)'
    }
  },
  helperText: {
    color: '#ffffff9c',
    "&:before": {
        borderBottom: '1px solid rgba(255, 255, 255, 0.42)'
    },
    marginTop: '0px',
    lineHeight: '22px'
  },
  loginBtn: {
    marginTop: '18px'
  },
  toolBar: {
    display: 'grid',
    gridTemplateColumns: '4fr 2fr',
    '@media (max-width: 1500px)' : {
      gridTemplateColumns: '3fr 2fr'
    },
    '@media (max-width: 1090px)' : {
      gridTemplateColumns: '1fr 2fr'
    },
    '@media (max-width: 954px)' : {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr',
      paddingBottom: '8px'
    }
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
  },
})(TextField);

function NavBar(props) {
    const classes = useStyles();
    let [username, setUser] = useState('');
    let [password, setPass] = useState('');
    let [userError, setUserError] = useState(false);
    let [passError, setPassError] = useState(false);
    let [open, setOpen] = useState(false);
    let [success, setSuccess] = useState(false);
    let [message, setMessage] = useState('');
    
    React.useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        props.history.push('/contacts');
      }
    }, []);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    function updateUser(string) {
        if (string.length > 0) {
            setUser(string)
            setUserError(false)
        }
        else setUserError(true)
    }

    function updatePass(string) {
        if (string.length > 0) {
            setPass(string)
            setPassError(false)
        }
        else setPassError(true)
    }

    function submitHandler(e) {
      e.preventDefault()
      const state = {
        username,
        password,
      }
      axios.post(process.env.REACT_APP_BASE_URL+'/api/users/login', state)
        .then(response => {
          localStorage.setItem('name', response.data.first_name);
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('token', response.data.token);
          setMessage('Logging in...')
          setSuccess(true)
          setOpen(true)
          setTimeout(() => {
            props.history.push('/contacts');
          }, 2000)
        })
        .catch(error => {
          setMessage('Invalid login credentials!')
          setSuccess(false)
          setOpen(true)
          console.error(error)
        })
    }

    return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
            <div className={classes.icon}>
              <Contacts className={classes.menuButton} color="inherit" aria-label="menu" />
              <Typography className={classes.title}>
                Address Book
              </Typography>
            </div>
            <form className={classes.form} onSubmit={submitHandler}>
              <CssTextField
                required
                label="Username"
                margin="normal"
                className={classes.username}
                InputProps={{
                  className: classes.multilineColor
                }}
                InputLabelProps={{
                  className: classes.multilineColor
                }}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
                error={userError}
                onBlur={e => updateUser(e.target.value)}
                onChange={e => updateUser(e.target.value)}
                helperText={userError ? "Username is required!" : null}
              />
              <CssTextField
                required
                label="Password"
                type="password"
                margin="normal"
                className={classes.username}
                InputProps={{
                  className: classes.multilineColor
                }}
                InputLabelProps={{
                  className: classes.multilineColor
                }}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
                error={passError}
                onBlur={e => updatePass(e.target.value)}
                onChange={e => updatePass(e.target.value)}
                helperText={passError ? "Password is required!" : null}
              />
              <Button
                onClick={props.handleChange}
                color="inherit" 
                className={classes.loginBtn} 
              >
                Login
              </Button>
            </form>
        </Toolbar>
      </AppBar>
      <Toast open={open} handleClose={handleClose} success={success} message={message} />
    </div>
  );
}
export default withRouter(NavBar)
