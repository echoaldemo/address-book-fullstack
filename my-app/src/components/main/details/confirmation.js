import React from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Warning } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '29px',
        letterSpacing: '6px',
        margin: 0
    },
    confirmation: {
        backgroundColor: '#770707',
        color: 'white',
        textAlign: 'center'
    },
    container: {
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        justifyItems: 'center', 
        marginTop: '30px'
    },
    warning: {
        fontSize: '50px', 
        color: '#770707'
    },
    content: {
        padding: '8px 30px 30px 30px',
        fontSize: '24px',
        letterSpacing: '1px',
        textAlign: 'justify'
    },
    actions: {
        justifyContent: 'center', 
        paddingBottom: '40px'
    },
    editConfirmation: {
        backgroundColor: '#999930',
        color: 'white',
        textAlign: 'center'
    },
    editWarning: {
        color: '#999930',
        fontSize: '50px'
    }
}));

const ContinueEditButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#4e991b',
        '&:hover': {
            backgroundColor: '#305d11',
        },
    },
}))(Button);

const ContinueDeleteButton = withStyles(theme => ({
    root: {
        color: 'white',
        backgroundColor: '#c73b3b',
        '&:hover': {
            backgroundColor: '#6f0000',
        },
    },
}))(Button);

export default function Confirmation(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title" className={props.edit ? classes.editConfirmation : classes.confirmation}>
                <p className={classes.title}>
                    CONFIRMATION
                </p>
            </DialogTitle>
            <DialogContent>
                <div className={classes.container}>
                    <Warning className={props.edit ? classes.editWarning :classes.warning} />
                    <Typography variant="h4" gutterBottom className={classes.content}>
                        {props.edit 
                        ? 'Do you want to save the changes?'
                        : 'Are you sure you want to delete this contact from your address book?'
                        }
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={props.handleClose} variant="contained">
                    Cancel
                </Button>
                {props.edit
                ?   <ContinueEditButton onClick={props.continue} variant="contained" color="primary">
                        Continue
                    </ContinueEditButton>
                :   <ContinueDeleteButton onClick={props.continue} variant="contained" color="primary">
                        Continue
                    </ContinueDeleteButton>
                }
            </DialogActions>
        </React.Fragment>
    );
}