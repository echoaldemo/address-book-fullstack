import React from 'react';
import { DialogContent, Typography, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
        setTimeout(this.props.openSuccess, 2000);
    }

    render(){
        const { classes } = this.props
        return (
            <DialogContent>
                <div className={classes.container}>
                    <CircularProgress size={60} />
                    <Typography variant="h4" gutterBottom className={classes.container}>
                        Deleting contact...
                    </Typography>
                </div>
            </DialogContent>
        );
    }
}
export default withStyles(styles)(Loading)