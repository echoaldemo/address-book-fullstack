import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Avatar } from '@material-ui/core'
import { Button } from '@material-ui/core';
import ContactDetails from './contactDetails';
import withWidth from '@material-ui/core/withWidth';

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
    },
    mdContainer: {
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '45px'
    },
    xsContainer: {
        display: 'grid',
        padding: '20px',
        gridGap: '45px',
        gridTemplateColumns: '1fr',
        justifyItems: 'center'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        justifyItems: 'center',
        alignItems: 'center'
    }
}));

function ContactsTable(props) {
    const { width } = props;
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
        <div className={
            (() => {
                if (width === 'lg' || width === 'xl') {
                    return classes.container
                } else if (width === 'md' || width === 'sm') {
                    return classes.mdContainer
                } else {
                    return classes.xsContainer
                }
            })()}
        >
        {props.showFiltered
            ? props.filtered.map(contact => (
                <Grid className={width === 'xs' ? classes.grid : ''} key={contact.first_name} xs={width === 'xs' ? false : 3} item sm container>
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
                                {contact.mobile_phone === ""
                                    ? 'No number associated'
                                    : contact.mobile_phone
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            ))
            : props.contacts.map(contact => (
                <Grid className={width === 'xs' ? classes.grid : ''} key={contact.first_name} xs={width === 'xs' ? false : 3} item sm container>
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
export default withWidth()(ContactsTable);