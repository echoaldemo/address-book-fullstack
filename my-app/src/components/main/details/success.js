import React from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircle } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '29px',
        letterSpacing: '6px',
        margin: 0
    },
    content: {
        paddingTop: '25px',
        fontSize: '24px',
        letterSpacing: '1px',
        textAlign: 'justify'
    },
    container: {
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        justifyItems: 'center', 
        marginTop: '30px',
        padding: '55px'
    },
    check: {
        fontSize: '50px', 
        color: '#01492d'
    },
    action: {
        justifyContent: 'center', 
        paddingBottom: '40px'
    },
    success: {
        backgroundColor: '#01492d',
        color: 'white',
        textAlign: 'center'
    }
}));


export default function Loading(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title" className={classes.success}>
                <p className={classes.title}>
                    SUCCESS
                </p>
            </DialogTitle>
            <DialogContent>
                <div className={classes.container}>
                    <CheckCircle className={classes.check} />
                    <Typography variant="h4" gutterBottom className={classes.content}>
                        {props.message}
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions className={classes.action}>
                <Button variant="contained" onClick={props.handleClose}>
                    Close
                </Button>
            </DialogActions>
        </React.Fragment>
    );
} 