import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Avatar } from '@material-ui/core'
import { Button } from '@material-ui/core';
import ContactDetails from '../contactDetails';
import withWidth from '@material-ui/core/withWidth';
import axios from 'axios'

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

export default function GroupMembers(props) {
    const { width } = props;
    const classes = useStyles();
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [contacts, setContacts] = React.useState([]);

    React.useEffect(() => {
        if (props.contacts){
            props.contacts.map(contact => {
                axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/${contact}`)
                .then(response => {
                    setContacts(prevState => [...prevState, response.data] )
                })
                .catch(error => {
                    console.error(error)
                })
            })
        }
        setDataLoaded(true)
    }, []);

    return (
        <div className={classes.container}> 
        {dataLoaded
        ?   contacts.map(contact => (
                <Grid key={contact.first_name} item sm container>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <Button /*onClick={() => handleDialog(contact.id)}*/>
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
        </div>
    );
}