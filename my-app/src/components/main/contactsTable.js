import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Avatar } from '@material-ui/core'
import { Button } from '@material-ui/core';
import ContactDetails from './contactDetails';

const useStyles = makeStyles(theme => ({
    container: {
        padding: '27px 27px 20px 96px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gridGap: '45px'  
    },
    avatar: {
        backgroundColor: 'rgb(8, 181, 195)', 
        marginRight: '10px', 
        fontSize: '20px'
    }
}));

export default function ContactsTable(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);

    function handleDialog(id) {
        setSelected(id)
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    
    return (
        <div className={classes.container}>
        {props.showFiltered
            ? props.filtered.map(contact => (
                <Grid key={contact.first_name} item xs={3} sm container>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <Button onClick={() => handleDialog(contact.id)}>
                                {contact.first_name.charAt(0) + contact.last_name.charAt(0)}
                            </Button>
                        </Avatar>
                    </Grid>
                    <Grid item xs container direction="column" spacing={5}>
                        <Grid item>
                            <Typography gutterBottom variant="subtitle1">
                                {contact.first_name + ' ' + contact.last_name}
                            </Typography>
                            <Typography variant="body2" gutterBottom color="textSecondary">
                                {contact.phone}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                ))
                : props.contacts.map(contact => (
                    <Grid key={contact.first_name} item xs={3} sm container>
                        <Grid item>
                            <Avatar className={classes.avatar}>
                                <Button onClick={() => handleDialog(contact.id)}>
                                    {contact.first_name.charAt(0) + contact.last_name.charAt(0)}
                                </Button>
                            </Avatar>
                        </Grid>
                        <Grid item xs container direction="column" spacing={5}>
                            <Grid item>
                                <Typography  gutterBottom variant="subtitle1">
                                    {contact.first_name + ' ' + contact.last_name}
                                </Typography>
                                <Typography variant="body2" gutterBottom color="textSecondary">
                                    {contact.mobile_phone === ""
                                    ?   'No number associated'
                                    :   contact.mobile_phone
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            }
            <ContactDetails 
            updateContacts={props.updateContacts}
            selected={selected} 
            open={open} 
            handleClose={handleClose} 
            />
        </div>
    );
}