import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Avatar, Tooltip } from '@material-ui/core'
import { Button } from '@material-ui/core';
import ContactDetails from '../contactDetails';
import withWidth from '@material-ui/core/withWidth';
import axios from 'axios'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddToGroup from './addToGroup'

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

const id = localStorage.getItem('id');

export default function GroupMembers(props) {
    const { width } = props;
    const classes = useStyles();
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [contacts, setContacts] = React.useState([]);
    const [notInclude, setNotInclude] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [config, setConfig] = React.useState('')
    const [openDetails, setOpenDetails] = React.useState(false);

    React.useEffect(() => {
        const head = `Bearer ${localStorage.getItem('token')}`
        setConfig({
            headers: {authorization: head}    
        })
        if (props.contacts){
            props.contacts.map(contact => {
                axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/${contact}`, {headers: {authorization: head}})
                .then(response => {
                    if (response.data){
                    setContacts(prevState => [...prevState, response.data] )
                    }
                })
                .catch(error => {
                    console.error(error)
                })
            })
        }
        setDataLoaded(true)
    }, []);

    function handleDialog() {
        axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/all/${id}`, config)
            .then(response => {
                const arr = JSON.stringify(response.data, function (key, value) { return value || "" })
                let myArray = [...JSON.parse(arr)]
                if (props.contacts){
                    var filtered = myArray.filter( (item) => {
                           return props.contacts.indexOf(item.id) === -1;
                    });
                    setNotInclude(filtered)
                }
                else {
                    setNotInclude(myArray)
                }
            })
        setOpen(true);
    }

    function openContact(id) {
        setSelected(id)
        setOpenDetails(true)
    }

    function handleClose() {
        setOpen(false);
        setOpenDetails(false)
    }

    function updateMembers() {
        props.updateGroups()
        setContacts([])
        axios.get(process.env.REACT_APP_BASE_URL + `/api/group/${props.groupId}`, config)
            .then(response => {
                response.data.map(contact => {
                axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/${contact}`, config)
                    .then(response => {
                        const arr = JSON.stringify(response.data, function (key, value) { return value || "" })
                        setContacts(prevState => [...prevState, JSON.parse(arr)] )
                    })
                    .catch(error => {
                        console.error(error)
                    })
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className={classes.container}> 
        {dataLoaded
        ?   contacts.map(contact => (
                <Grid key={contact.first_name} item sm container>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <Button onClick={() => openContact(contact.id)}>
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
        : null
        }
        {dataLoaded
        ?   <React.Fragment>
            <Tooltip title="Add contacts to group" placement="right">
                <Fab style={{ backgroundColor: "rgb(13, 169, 181)" }}size="small" onClick={handleDialog} color="primary" aria-label="add"size="small" >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <AddToGroup config={config} open={open} notInclude={notInclude} handleAdd={updateMembers} groupId={props.groupId} currentMembers={contacts} handleClose={handleClose} />
            <ContactDetails 
            updateContacts={updateMembers}
            selected={selected}
            open={openDetails} 
            handleClose={handleClose}
            unDeletable={true}
            />
            </React.Fragment>
        : null
        }
        </div>
    );
}