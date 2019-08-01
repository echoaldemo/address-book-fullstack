import React from 'react';
import { Dialog }from '@material-ui/core';
import DetailsForm from './details/details'
import Confirmation from './details/confirmation'
import Loading from './details/loading'
import Success from './details/success'

export default class ContactDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            details: true,
            confirmation: false,
            loading: false,
            success: false,
        }
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

    render(){
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                    {this.state.details
                    ? <DetailsForm handleClose={this.props.handleClose} delete={this.openConfirmation} />
                    : null
                    }
                    {this.state.confirmation
                    ? <Confirmation handleClose={this.props.handleClose} continue={this.openLoading}  />
                    : null
                    }
                    {this.state.loading
                    ? <Loading openSuccess={this.openSuccess} />
                    : null
                    }
                    {this.state.success
                    ? <Success handleClose={this.props.handleClose}/>
                    : null
                    }
                </Dialog>
            </div>
        );
    }
}