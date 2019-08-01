import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
}

const defaultState = {
    first_name: '',
    last_name: '',
    home_phone: '',
    mobile_phone: '',
    work_phone: '',
    email: '',
    city: '',
    state_or_province: '',
    postal_code: '',
    country: '',
    firstError: false,
    addDisabled: true,
}

class AddContact extends Component {
    constructor(props){
        super(props)
        this.state = defaultState
    }

    handleFirst = (string) => {
        if (string.length > 0) {
            this.setState({
                first_name: string,
                firstError: false,
                addDisabled: false
            })
        }
        else { 
            this.setState({
                firstError: true,
                addDisabled: true
            })
        }
    }

    handleLast = (string) => {
        this.setState({
            last_name: string
        }) 
    }

    handleHome = (string) => {
        this.setState({
            home_phone: string
        })
    }

    handleMobile = (string) => {
        this.setState({
            mobile_phone: string
        })
    }

    handleWork = (string) => {
        this.setState({
            work_phone: string
        })
    }

    handleEmail = (string) =>{
        this.setState({
            email: string
        })
    }

    handleCity = (string) => {
        this.setState({
            city: string
        })
    }

    handleSoP = (string) => {
        this.setState({
            state_or_province: string
        })
    }

    handlePostal = (string) => {
        this.setState({
            postal_code: string
        })
    }

    handleCountry = (string) => {
        this.setState({
            country: string
        })
    }

    handleAdd = () => {
        if (this.state.first_name.length === 0)
        this.setState({
            firstError: true
        })
        else{   
            console.log(this.state)
            this.setState({
                ...defaultState
            })
        }
    }

    render(){
        const { open, handleClose, classes } = this.props;
        return (
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                        <p className={classes.title}>
                            Add Contact
                        </p>
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.container}>
                            <TextField
                                autoFocus
                                margin="dense"
                                required
                                label="First Name"
                                onChange={e => this.handleFirst(e.target.value)}
                                onBlur={e => this.handleFirst(e.target.value)}
                                error={this.state.firstError}
                                helperText={this.state.firstError ? 'First name is required!' : null}
                            />
                            <TextField
                                margin="dense"
                                label="Last Name"
                            onChange={e => this.handleLast(e.target.value)}
                                helperText={null}
                            />
                            <TextField
                                margin="dense"
                                label="Home Phone"
                            onChange={e => this.handleHome(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Mobile Phone"
                            onChange={e => this.handleMobile(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Work Phone"
                            onChange={e => this.handleWork(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                            onChange={e => this.handleEmail(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="City"
                            onChange={e => this.handleCity(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="State or Province"
                            onChange={e => this.handleSoP(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Postal Code"
                            onChange={e => this.handlePostal(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Country"
                            onChange={e => this.handleCountry(e.target.value)}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={this.state.addDisabled} onClick={() => this.handleAdd()} color="primary">
                            Add
                        </Button> 
                    </DialogActions>
                </Dialog>
        );
    }
}

export default withStyles(styles)(AddContact)