import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, Typography, IconButton, Tooltip } from '@material-ui/core'
import { People, PersonAdd } from '@material-ui/icons'
import AddContact from './addContact'

const useStyles = makeStyles(theme => ({
    contactsHead: {
        padding: '20px 0 0 15px',
        display: 'grid',
        gridTemplateColumns: '1fr 7fr 8fr 20px',
        fontFamily: "'Barlow Semi Condensed', sans- serif",
        alignItems: 'center'
    },
    peopleIcon: {
        marginRight: '6px',
        fontSize: '40px'
    },
    headInput: {
        display: 'grid',
        gridTemplateColumns: '4fr 3fr 1fr',
        gridGap: '20px'
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    function handleDialog() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <React.Fragment>
            <Typography gutterBottom variant="h5" className={classes.contactsHead}>
                <People className={classes.peopleIcon} /> All Contacts
                    <div className={classes.headInput}>
                    {/* SEARCH */}
                    <FormControl variant="outlined">
                        <InputLabel ref={inputLabel} htmlFor="outlined-search">
                            Search
                        </InputLabel>
                        <OutlinedInput
                            labelWidth={labelWidth}
                            style={{ display: "inline-block" }}
                            onChange={e => props.handleChange(e.target.value)}
                            id="outlined-search"
                        />
                    </FormControl>
                    {/* END SEARCH */}

                    {/* SELECT */}
                    <FormControl variant="outlined">
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                            Sort By
                        </InputLabel>
                        <Select
                            input={<OutlinedInput labelWidth={labelWidth} 
                            id="outlined-age-simple" value="first"
                            />}
                        >
                            <MenuItem value="first">First Name</MenuItem>
                            <MenuItem value="last">Last Name</MenuItem>
                        </Select>
                    </FormControl>
                    {/* END SELECT */}
                    <Tooltip title="Add Contact" placement="right">
                        <IconButton color="primary" onClick={() => handleDialog()}>
                            <PersonAdd />
                        </IconButton>
                    </Tooltip>
                </div>
            </Typography>
            <AddContact open={open} handleClose={handleClose} />
        </React.Fragment>
    );
}