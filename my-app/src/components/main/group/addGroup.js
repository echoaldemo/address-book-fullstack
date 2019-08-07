import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../details/loading'
import Success from '../details/success'
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
    label: {
        color: '#1e6f92',
        fontSize: '15px'
    }
}

const defaultState = {
    name: '',
    nameError: false,
    addDisabled: true,
    addForm: true,
    loading: false,
    success: false,
}

const id = localStorage.getItem('id');

class AddGroup extends Component {
    constructor(props){
        super(props)
        this.state = defaultState
    }

    handleName = (string) => {
        if (string.length > 0) {
            this.setState({
                name: string,
                nameError: false,
                addDisabled: false
            })
        }
        else { 
            this.setState({
                nameError: true,
                addDisabled: true
            })
        }
    }

    handleAdd = () => {
        if (this.state.name.length === 0){
            this.setState({
                nameError: true
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
        this.props.updateGroups()
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
            <Dialog fullScreen={width === 'xs' ? true : false} fullWidth={true} maxWidth="xs" onExit={this.props.handleAdd} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    {this.state.addForm
                    ?   <React.Fragment>
                            <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the name of the group:
                                </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        required
                                        fullWidth
                                        label="Group Name"
                                        onChange={e => this.handleName(e.target.value)}
                                        error={this.state.nameError}
                                        helperText={this.state.nameError ? 'Group name is required!' : null}
                                        InputLabelProps={{
                                        className: classes.label,
                                        }}
                                    />
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
                    ? <Loading message="Adding group..." addGroup={true} openSuccess={this.openSuccess} userID={id} newGroup={this.state} updateGroups={this.props.updateGroups} />
                    : null
                    }
                    {this.state.success
                    ? <Success message="Group was added." handleClose={this.closeHandler}/>
                    : null
                    }
                </Dialog>
        );
    }
}

export default withWidth()(withStyles(styles)(AddGroup));