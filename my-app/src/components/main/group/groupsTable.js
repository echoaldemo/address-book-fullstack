import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Avatar } from '@material-ui/core'
import { Button } from '@material-ui/core';
import ContactDetails from '../contactDetails';
import withWidth from '@material-ui/core/withWidth';
import GroupMembers from './groupMembers'

const useStyles = makeStyles(theme => ({
    container: {
        padding: '27px 27px 20px 46px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gridGap: '45px',
        '@media (max-width: 1100px)' : {
            padding: '20px',
            gridTemplateColumns: '1fr 1fr',
        },
        '@media (max-width: 699px)' : {
            gridTemplateColumns: '1fr',
            justifyItems: 'center'
        },
        '@media (max-width: 650px)' : {
            gridTemplateColumns: '1fr 1fr',
        },
        '@media (max-width: 560px)' : {
            gridTemplateColumns: '1fr',
        }
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

const ColoredLine = ({ color }) => (
    <hr
        style={{
            backgroundColor: color,
            height: 5,
            border: 0
        }}
    />
);

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
    console.log(props)

    return (
        <div style={{ padding: '20px 50px 0 50px'}}>
            {props.groups.map(group => (
                <React.Fragment key={group.id}>
                    <Typography gutterBottom variant="h5">
                        {group.name}
                    </Typography>
                    <ColoredLine color="rgb(6, 106, 114)" />
                    <GroupMembers contacts={group.contacts} />
                </React.Fragment>
                ))
            }
        </div>
    );
}
export default withWidth()(ContactsTable);

/*<ContactDetails 
    updateContacts={props.updateContacts}
    selected={selected} 
    open={open} 
    handleClose={handleClose} 
/>*/