import React from 'react';
import { DialogContent, Typography, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'

const styles = {
    content: {
        padding: '35px 30px 30px',
        fontSize: '24px',
        letterSpacing: '1px',
        textAlign: 'justify'
    },
    container: {
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        justifyItems: 'center', 
        marginTop: '30px',
        padding: '39px',
        fontSize: '25px'
    },
};

class Loading extends React.Component {
    
    componentDidMount(){
        if (this.props.edit){
            axios.patch(process.env.REACT_APP_BASE_URL + `/api/contacts/${this.props.selected}`, this.props.details)
                .then(response => {
                    setTimeout(this.props.updateContacts, 2000);
                })
                .catch(error => {
                    console.error(error)
                })
            setTimeout(this.props.openSuccess, 2000);
        }
        else if (this.props.add) {
            axios.post(process.env.REACT_APP_BASE_URL + `/api/contacts/add/${this.props.userID}`, this.props.newContact)
                .then(response => {
                    this.props.handleAdd()
                })
                .catch(error => {
                    console.error(error)
                })
            setTimeout(this.props.openSuccess, 2000);
        }
        else if (this.props.addGroup) {
            axios.post(process.env.REACT_APP_BASE_URL + `/api/groups/create/${this.props.userID}`, this.props.newGroup)
                .then(response => {
                    this.props.updateGroups()
                })
                .catch(error => {
                    console.error(error)
                })
            setTimeout(this.props.openSuccess, 2000);
        }  
        else {
            axios.delete(process.env.REACT_APP_BASE_URL + `/api/contacts/${this.props.selected}`)
                .then(response => {
                    setTimeout(this.props.updateContacts, 2000);
                })
                .catch(error => {
                    console.error(error)
                })
            setTimeout(this.props.openSuccess, 2000);
        }
    }

    render(){
        const { classes, message } = this.props
        return (
            <DialogContent>
                <div className={classes.container}>
                    <CircularProgress size={60} />
                    <Typography variant="h4" gutterBottom className={classes.container}>
                        {message}
                    </Typography>
                </div>
            </DialogContent>
        );
    }
}
export default withStyles(styles)(Loading)