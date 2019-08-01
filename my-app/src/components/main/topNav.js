import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Person, Contacts,  } from '@material-ui/icons'
import { Menu, MenuItem } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    appBar: {
        background: 'linear-gradient(83deg, rgba(2,78,83,1) 0%, rgba(0,90,126,1) 31%, rgba(4,1,47,1) 82%)',
        padding: '15px 15px 8px 15px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },  
    title: {
        fontFamily: "'Caveat', cursive",
        letterSpacing: '4px',
        flexGrow: 1,
        fontSize: '1.85rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: '2.5rem'
    },
    logoutBtn: {
        width: '150px',
        padding: '0 20px',
        textTransform: 'capitalize',
        fontSize: '20px',
        fontFamily: "'Barlow Semi Condensed', sans- serif",
    },
    logoutBtnCntnr: {
        display: 'grid',
        justifyContent: 'right',
    },
}));

function TopNav(props) {
    const classes = useStyles();   
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogout(){
        localStorage.removeItem('token');
        props.history.push("/");
    }

    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar>
                <Contacts className={classes.menuButton} color="inherit" aria-label="menu" />
                <Typography className={classes.title}>
                    Address Book
                </Typography>
            </Toolbar>
            <div className={classes.logoutBtnCntnr}>
                <Button 
                    aria-controls="simple-menu" 
                    aria-haspopup="true" 
                    onClick={handleClick}             
                    color="inherit"
                    className={classes.logoutBtn} 
                >
                    <Person style={{ marginRight: '10px' }} />   User
                </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
            </div>
        </AppBar>
    );
}

export default withRouter(TopNav)