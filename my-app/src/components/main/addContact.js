import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Loading from './details/loading'
import Success from './details/success'
import withWidth from '@material-ui/core/withWidth';

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
    },
    xsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        padding: '0 15px'
    },
    label: {
        color: '#1e6f92',
        fontSize: '15px'
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
    addForm: true,
    loading: false,
    success: false
}

const id = localStorage.getItem('id');

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
        if (this.state.first_name.length === 0){
            this.setState({
                firstError: true
            })
        }
        else {
            this.setState({
                addForm: false,
                loading: true
            }) 
        }
    }

    openSuccess = () => {
        this.setState({
            loading: false,
            success: true
        })
    }

    closeHandler = () => {
        this.props.handleClose()
        setTimeout(() => {
            this.setState({
                ...defaultState
            })
        }, 1000)
    }

    render(){
        const { open, handleClose, classes, width } = this.props;
        return (
            <Dialog fullScreen={width === 'xs' ? true : false} onExit={this.props.handleAdd} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    {this.state.addForm
                    ?   <React.Fragment>
                            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
                                <p className={classes.title}>
                                    Add Contact
                                </p>
                            </DialogTitle>
                            <DialogContent>
                                <div className={width === 'xs' ? classes.xsContainer : classes.container}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        required
                                        label="First Name"
                                        onChange={e => this.handleFirst(e.target.value)}
                                        error={this.state.firstError}
                                        helperText={this.state.firstError ? 'First name is required!' : null}
                                        InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Last Name"
                                        onChange={e => this.handleLast(e.target.value)}
                                        helperText={null}
                                        InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Home Phone"
                                        onChange={e => this.handleHome(e.target.value)}
                                        InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Mobile Phone"
                                        onChange={e => this.handleMobile(e.target.value)}
                                        InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Work Phone"
                                    onChange={e => this.handleWork(e.target.value)}
                                    InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Email"
                                        type="email"
                                    onChange={e => this.handleEmail(e.target.value)}
                                    InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="City"
                                    onChange={e => this.handleCity(e.target.value)}
                                    InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="State or Province"
                                    onChange={e => this.handleSoP(e.target.value)}
                                    InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Postal Code"
                                    onChange={e => this.handlePostal(e.target.value)}
                                    InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Country"
                                    onChange={e => this.handleCountry(e.target.value)}
                                    InputLabelProps={{
                                        className: classes.label,
                                        }}
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
                        </React.Fragment>
                    : null
                    }
                    {this.state.loading
                    ? <Loading message="Adding contact..." add={true} openSuccess={this.openSuccess} userID={id} newContact={this.state} handleAdd={this.props.handleAdd}/>
                    : null
                    }
                    {this.state.success
                    ? <Success message="Contact was added." handleClose={this.closeHandler}/>
                    : null
                    }
                </Dialog>
        );
    }
}

export default withWidth()(withStyles(styles)(AddContact));