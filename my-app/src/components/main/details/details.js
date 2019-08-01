import React from 'react';
import { Button, IconButton, TextField, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForever } from '@material-ui/icons'

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
    let [ edit, setEdit ] = React.useState(true)
    let [ save, setSave ] = React.useState(false)

    function handleEdit(){
        setEdit(!edit)
        setSave(!save)
    }

    function handleSave() {
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
            <DialogContent>
                <div className={classes.container}>
                    <TextField
                        margin="dense"
                        label="First Name"
                        defaultValue="Jericho"
                        InputProps={{
                            readOnly: edit,
                        }}
                        />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        defaultValue="Aldemo"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Home Phone"
                        defaultValue="501-911-091"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Mobile Phone"
                        defaultValue="09471434511"
                        InputProps={{
                            readOnly: edit,
                        }}
                        />
                    <TextField
                        margin="dense"
                        label="Work Phone"
                        defaultValue="123-456789"
                        InputProps={{
                            readOnly: edit,
                        }}
                        />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        defaultValue="jericho.aldemo@boom.camp"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        defaultValue="Sorsogon City"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="State or Province"
                        defaultValue="Sorsogon"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Postal Code"
                        defaultValue="4501"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Country"
                        defaultValue="Philippines"
                        InputProps={{
                            readOnly: edit,
                        }}
                    />
                </div>
            </DialogContent>
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
                    :   <Button onClick={() => handleSave()} color="primary">
                            Save
                        </Button>
                    }
                </DialogActions>
            </div>
        </React.Fragment>
    );
}