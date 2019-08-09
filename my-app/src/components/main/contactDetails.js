import React from 'react';
import { Dialog }from '@material-ui/core';
import DetailsForm from './details/details'
import Confirmation from './details/confirmation'
import Loading from './details/loading'
import Success from './details/success'
import withWidth from '@material-ui/core/withWidth'


class ContactDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            details: true,
            confirmation: false,
            loading: false,
            success: false,
            edit: false,
            updatedContactDetails: null
        }
        this.baseState = this.state 
    }

    openConfirmation = () => {
        this.setState({
            details: false,
            confirmation: true
        })
    }

    openLoading = () => {
        this.setState({
            confirmation: false,
            loading: true
        })
    }

    openSuccess = () => {
        this.setState({
            loading: false,
            success: true
        })
    }

    handleCancelConfirm = () => {
        this.props.handleClose()
        setTimeout(() => {
            this.setState({
                edit: false,
                details: true,
                confirmation: false
            })
        }, 500)
    }

    handleSuccess = () => {
        this.props.handleClose()
        setTimeout(() => {
            this.setState(this.baseState)
        }, 500)
    }

    openEdit = (details) => {
        this.setState({
            details: false,
            confirmation: true,
            edit: true,
            updatedContactDetails: details
        })
    }

    closeHandler = () => {
        this.setState(this.baseState)
        this.props.handleClose()
    }

    render(){
        const { width } = this.props
        return (
            <div>
                <Dialog fullScreen={width === 'xs' ? true : false} disableBackdropClick disableEscapeKeyDown open={this.props.open} onClose={this.closeHandler} aria-labelledby="form-dialog-title">
                    {this.state.details
                    ? <DetailsForm 
                        width={width}
                        unDeletable={this.props.unDeletable}
                        openEdit={this.openEdit} 
                        updateContacts={this.props.updateContacts} 
                        selected={this.props.selected} 
                        handleClose={this.props.handleClose} 
                        delete={this.openConfirmation} />
                    : null
                    }
                    {this.state.confirmation
                    ? <Confirmation 
                        edit={this.state.edit} 
                        handleClose={this.handleCancelConfirm} 
                        continue={this.openLoading}  />
                    : null
                    }
                    {this.state.loading
                    ? <Loading 
                        edit={this.state.edit} 
                        details={this.state.updatedContactDetails} 
                        updateContacts={this.props.updateContacts} 
                        selected={this.props.selected}  
                        openSuccess={this.openSuccess} 
                        message={this.state.edit ? 'Updating contact...' : 'Deleting contact...'}/>
                    : null
                    }
                    {this.state.success
                    ? <Success message={this.state.edit ? 'Contact was updated.' : 'Contact was deleted.'} handleClose={this.handleSuccess}/>
                    : null
                    }
                </Dialog>
            </div>
        );
    }
}

export default withWidth()(ContactDetails);