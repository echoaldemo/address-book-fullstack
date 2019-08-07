import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Tooltip, Button } from '@material-ui/core'
import { People, PersonAdd, Domain, LibraryAdd } from '@material-ui/icons'
import AddContact from './addContact'
import AddGroup from './group/addGroup'


const useStyles = makeStyles(theme => ({
    contactsHead: {
        padding: '20px 0 0 15px',
        display: 'grid',
        gridTemplateColumns: '1fr 19fr 2fr',
        fontFamily: "'Barlow Semi Condensed', sans- serif",
        alignItems: 'center',
        '@media (max-width: 650px)' : {
            gridTemplateColumns: '1fr 9fr 2fr',
        }
    },
    icon: {
        marginRight: '6px',
        fontSize: '40px'
    },
    button: {
        fontSize: '10px',
        marginLeft: '10px',
        color: '#068892'
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [openAddContact, setOpenAddContact] = React.useState(false);
    const [openAddGroup, setOpenAddGroup] = React.useState(false);

    function handleDialog() {
        props.viewGroups 
        ? setOpenAddGroup(true)
        : setOpenAddContact(true)
    }

    function handleCloseContact() {
        setOpenAddContact(false);
    }

    function handleCloseGroup() {
        setOpenAddGroup(false);
    }

    return (
        <React.Fragment>
            <Typography gutterBottom variant="h5" className={classes.contactsHead}>
                {props.viewGroups 
                    ? <Domain className={classes.icon} />
                    : <People className={classes.icon} />
                }
                <div>
                    {props.viewGroups ? 'Groups' : 'All Contacts'}
                    <Button onClick={props.handleViewGroup} className={classes.button}>
                        View {props.viewGroups ? 'All Contacts' : 'Groups'}
                    </Button>
                </div>
                <Tooltip title={props.viewGroups ? "Create Group" : "Add Contact"} placement="left">
                    <IconButton color="primary" onClick={() => handleDialog()}>
                        {props.viewGroups ? <LibraryAdd /> : <PersonAdd /> }
                    </IconButton>
                </Tooltip>
            </Typography>
            <AddContact handleAdd={props.handleAdd} open={openAddContact} handleClose={handleCloseContact} />
            <AddGroup open={openAddGroup} updateGroups={props.updateGroups} handleClose={handleCloseGroup} />
        </React.Fragment>
    );
}