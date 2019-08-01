import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dialogTitle: {
        backgroundColor: '#00293b',
        color: 'white',
        textAlign: 'center'
    },
    title: {
        fontSize: '29px',
        letterSpacing: '6px',
        margin: 0
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '30px'
    }
}));


export default function ContactDetails(props) {
    const classes = useStyles();
    let [first_name, setFirst] = useState('');
    let [last_name, setLast] = useState('');
    let [home_phone, setHome] = useState('');
    let [mobile_phone, setMobile] = useState('');
    let [work_phone, setWork] = useState('');
    let [email, setEmail] = useState('');
    let [city, setCity] = useState('');
    let [state_or_province, setSoP] = useState('');
    let [postal_code, setPostal] = useState('');
    let [country, setCountry] = useState('');
    let [firstError, setFirstError] = useState(false);

    function handleFirst(string) {
        if (string.length > 0) {
            setFirst(string)
            setFirstError(false)
        }
        else setFirstError(true)
    }

    function handleLast(string) {
        setLast(string)   
    }

    function handleHome(string) {
        setHome(string)
    }

    function handleMobile(string) {
        setMobile(string)
    }

    function handleWork(string) {
        setWork(string)
    }

    function handleEmail(string) {
        setEmail(string)
    }

    function handleCity(string) {
        setCity(string)
    }

    function handleSoP(string) {
        setSoP(string)
    }

    function handlePostal(string) {
        setPostal(string)
    }

    function handleCountry(string) {
        setCountry(string)
    }

    function handleAdd(){
        if (first_name.length === 0)
        setFirstError(true)
        else{
            const state = {
                first_name,
                last_name,
                home_phone,
                mobile_phone,
                work_phone,
                email,
                city,
                state_or_province,
                postal_code,
                country
            }
            console.log(state)
            setFirst('')
            setLast('')
            setHome('')
            setMobile('')
            setWork('')
            setEmail('')
            setCity('')
            setSoP('')
            setPostal('')
            setCountry('')
        }
    }

    return (
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    <h2 className={classes.title}>
                        Add Contact
                    </h2>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.container}>
                        <TextField
                            autoFocus
                            margin="dense"
                            required
                            label="First Name"
                            onChange={e => handleFirst(e.target.value)}
                            onBlur={e => handleFirst(e.target.value)}
                            error={firstError}
                            helperText={firstError ? 'First name is required!' : null}
                        />
                        <TextField
                            margin="dense"
                            label="Last Name"
                            onChange={e => handleLast(e.target.value)}
                            helperText={null}
                        />
                        <TextField
                            margin="dense"
                            label="Home Phone"
                            onChange={e => handleHome(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Mobile Phone"
                            onChange={e => handleMobile(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Work Phone"
                            onChange={e => handleWork(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            type="email"
                            onChange={e => handleEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="City"
                            onChange={e => handleCity(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="State or Province"
                            onChange={e => handleSoP(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Postal Code"
                            onChange={e => handlePostal(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Country"
                            onChange={e => handleCountry(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleAdd()} color="primary">
                        Add
                    </Button> 
                </DialogActions>
            </Dialog>
    );
}