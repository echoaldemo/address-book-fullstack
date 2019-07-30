import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    flexGrow: 1,
    fontSize: '1.85rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: '2.5rem'
  },
  username: {
    marginRight: theme.spacing(7),
    marginTop: '0px',
    marginBottom: '0px',
    height: '75px'
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
  success: {
    backgroundColor: '#005618'
  },
  warning: {
    backgroundColor: '#9a0707'
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(2),
    marginTop: '2px',
    color: '#d8d8d8'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  loginBtn: {
    marginTop: '18px'
  }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    let [username, setUser] = useState('');
    let [password, setPass] = useState('');
    let [userError, setUserError] = useState(false);
    let [passError, setPassError] = useState(false);
    let [open, setOpen] = useState(false);
    let [success, setSuccess] = useState(false);
    let [message, setMessage] = useState('');

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
      axios.post('http://localhost:3001/api/users/login', state)
        .then(response => {
          setMessage('Logging in...')
          setSuccess(true)
          setOpen(true);
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
        <Toolbar>
            <Contacts className={classes.menuButton} color="inherit" aria-label="menu" />
            <Typography className={classes.title}>
              Address Book
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
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
              <TextField
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
                type="submit"
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
