import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import { People, PersonAdd } from '@material-ui/icons'
import AddContact from './addContact'

const useStyles = makeStyles(theme => ({
    contactsHead: {
        padding: '20px 0 0 15px',
        display: 'grid',
        gridTemplateColumns: '1fr 19fr 2fr',
        fontFamily: "'Barlow Semi Condensed', sans- serif",
        alignItems: 'center'
    },
    peopleIcon: {
        marginRight: '6px',
        fontSize: '40px'
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleDialog() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }


    return (
        <React.Fragment>
            <Typography gutterBottom variant="h5" className={classes.contactsHead}>
                <People className={classes.peopleIcon} /> All Contacts
                    <Tooltip title="Add Contact" placement="right">
                        <IconButton color="primary" onClick={() => handleDialog()}>
                            <PersonAdd />
                        </IconButton>
                    </Tooltip>
            </Typography>
            <AddContact handleAdd={props.handleAdd} open={open} handleClose={handleClose} />
        </React.Fragment>
    );
}