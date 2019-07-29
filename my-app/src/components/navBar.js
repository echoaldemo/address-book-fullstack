import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Contacts from '@material-ui/icons/Contacts';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    let [username, setUser] = useState('');
    let [password, setPass] = useState('');
    let [userError, setUserError] = useState(false);
    let [passError, setPassError] = useState(false);
    let [open, setOpen] = React.useState(false);
    let [success, setSuccess] = React.useState(false);


    function handleClick() {
        if (username.length > 0 && password.length > 0){
        setSuccess(true)
        } else setSuccess(false)
        setOpen(true);
    }

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

    return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
            <Contacts className={classes.menuButton} color="inherit" aria-label="menu" />
            <Typography className={classes.title}>
                Address Book
            </Typography>
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

            <Button color="inherit" className={classes.loginBtn} onClick={handleClick}>Login</Button>
        </Toolbar>
      </AppBar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    classes: { root: success ? classes.success : classes.warning }
                }}
                message={
                success 
                ?  <span id="message-id" className={classes.message}>
                        <CircularProgress className={classes.icon}/>
                        Logging in...
                    </span>
                :   <span id="message-id" className={classes.message}>
                        <WarningIcon className={classes.icon} />
                        Invalid login credentials!
                    </span>
                }
            />
    </div>
  );
}