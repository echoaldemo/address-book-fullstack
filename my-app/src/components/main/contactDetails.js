import React from 'react';
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
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                    <h2 className={classes.title}>
                        Contact Details
                    </h2>
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
            </Dialog>
        </div>
    );
}