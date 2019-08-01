import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
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

export default function Toast(props) {
    const classes = useStyles();
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={props.open}
            autoHideDuration={6000}
            onClose={props.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
                classes: { root: props.success ? classes.success : classes.warning }
            }}
            message={
                <span id="message-id" className={classes.message}>
                    {props.success
                    ? <CircularProgress className={classes.icon} />
                    :  <WarningIcon className={classes.icon} /> 
                    }
                    {props.message}
                </span>
                }
            />
    );
}