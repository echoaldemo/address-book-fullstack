import React from 'react';
import { Button, IconButton, TextField, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForever } from '@material-ui/icons'
import axios from 'axios'


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
   },
   actions: {
       display: 'grid', 
       gridTemplateColumns: '1fr 1fr'
   },
   delete: {
       display: 'grid', 
       gridTemplateColumns: '1fr 3fr'
   }
}));

export default function DetailsForm(props) {
    const classes = useStyles();
    let [firstError, setFirstError] = React.useState(false),
    [edit, setEdit] = React.useState(true),
    [save, setSave] = React.useState(false),
    [contact, setContact] = React.useState(null),
    [dataLoaded, setDataLoaded] = React.useState(false);
    
    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/contacts/${props.selected}`)
            .then(response => {
                setContact(response.data)
                setDataLoaded(true)
            })
            .catch(error => {
                console.error(error)
            })
    }, []);

    function updateFirst(string) {
        if (string.length > 0) {
            setContact({
                ...contact,
                first_name: string
            });
            setFirstError(false)
        }
        else setFirstError(true)
    }

    function updateLast(string) {
        setContact({
            ...contact,
            last_name: string
        });
    }

    function updateHome(string) {
        setContact({
            ...contact,
            home_phone: string
        });
    }

    function updateMobile(string) {
        setContact({
            ...contact,
            mobile_phone: string
        });
    }

    function updateWork(string) {
        setContact({
            ...contact,
            work_phone: string
        });
    }

    function updateEmail(string) {
        setContact({
            ...contact,
            email: string
        });
    }

    function updateCity(string) {
        setContact({
            ...contact,
            city: string
        });
    }

    function updateSoP(string) {
        setContact({
            ...contact,
            state_or_province: string
        });
    }

    function updatePostal(string) {
        setContact({
            ...contact,
            postal_code: string
        });
    }

    function updateCountry(string) {
        setContact({
            ...contact,
            country: string
        });
    }

    function handleEdit(){
        setEdit(!edit)
        setSave(!save)
    }

    function handleSave() {
        axios.patch(`http://localhost:3001/api/contacts/${contact.id}`, contact)
        .then(response => {
            props.updateContacts()
        })
        .catch(error => {
        console.error(error)
        })
        setEdit(!edit)
        setSave(!save)
    }
    
    return (   
        <React.Fragment>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                <p className={classes.title}>
                    Contact Details
                </p>
            </DialogTitle>
            {dataLoaded
            ? 
            <DialogContent>
                <div className={classes.container}>
                    <TextField
                        error={firstError}
                        onChange={e => updateFirst(e.target.value)}
                        margin="dense"
                        label="First Name"
                        defaultValue={contact.first_name}
                        InputProps={{
                            readOnly: edit,
                        }}
                        helperText={firstError ? 'First name cannot be left blank!' : null}
                        />
                    <TextField
                        onChange={e => updateLast(e.target.value)}
                        margin="dense"
                        label="Last Name"
                        defaultValue={contact.last_name}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updateHome(e.target.value)}
                        margin="dense"
                        label="Home Phone"
                        defaultValue={contact.home_phone}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updateMobile(e.target.value)}
                        margin="dense"
                        label="Mobile Phone"
                        defaultValue={contact.mobile_phone}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updateWork(e.target.value)}
                        margin="dense"
                        label="Work Phone"
                        defaultValue={contact.work_phone}
                        InputProps={{
                            readOnly: edit,
                        }}
                        />
                    <TextField
                        onChange={e => updateEmail(e.target.value)}
                        margin="dense"
                        label="Email"
                        type="email"
                        defaultValue={contact.email}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updateCity(e.target.value)}
                        margin="dense"
                        label="City"
                        defaultValue={contact.city}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updateSoP(e.target.value)}
                        margin="dense"
                        label="State or Province"
                        defaultValue={contact.state_or_province}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updatePostal(e.target.value)}
                        margin="dense"
                        label="Postal Code"
                        defaultValue={contact.postal_code}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        onChange={e => updateCountry(e.target.value)}
                        margin="dense"
                        label="Country"
                        defaultValue={contact.country}
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                </div>
            </DialogContent>
            : null
            }
            <div className={classes.actions}>
                <div className={classes.delete}>
                    <Tooltip title="Delete Contact" placement="right">
                        <IconButton onClick={props.delete} color="primary">
                            <DeleteForever />
                        </IconButton>
                    </Tooltip>
                </div>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    {edit
                    ?   <Button onClick={() => handleEdit()} color="primary">
                            Edit
                        </Button>
                    :   <Button disabled={firstError} onClick={() => handleSave()} color="primary">
                            Save
                        </Button>
                    }
                </DialogActions>
            </div>
        </React.Fragment>
    );
}