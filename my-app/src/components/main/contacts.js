import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { CssBaseline, Paper } from '@material-ui/core';

import TopNav from './topNav'
import Header from './header'
import ContactsTable from './contactsTable'

const sample = [
    {
        first_name: 'Jericho',
        last_name: 'Aldemo',
        phone: '09471434511'
    },
    {
        first_name: 'Blaine',
        last_name: 'Anderson',
        phone: '0912345678'
    },
    {
        first_name: 'Rachel',
        last_name: 'Green',
        phone: '091234567890'
    },
    {
        first_name: 'Monica',
        last_name: 'Geller',
        phone: '091234567890'
    },
    {
        first_name: 'Ross',
        last_name: 'Geller',
        phone: '091234567890'
    },
    {
        first_name: 'Chandler',
        last_name: 'Bing',
        phone: '091234567890'
    },
    {
        first_name: 'Phoebe',
        last_name: 'Buffay',
        phone: '091234567890'
    },
    {
        first_name: 'Joey',
        last_name: 'Tribbiani',
        phone: '091234567890'
    }
]

const styles = {
    root: {
        flexGrow: 1,
    },
    childCells: {
        fontSize: '14px !important',
        color: 'grey !important',
        fontWeight: '300 !important',
    },
    paper: {
        backgroundColor: 'white',
        height: '83vh',
    },
    mainContainer: {
        margin: '0 auto',
        width: '60vw',
        marginTop: '20px'
    },
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            backgroundColor: color,
            height: 5,
            border: 0
        }}
    />
);


class Contacts extends Component {
    constructor(){
        super()
        this.state = {
            contacts: sample,
            filtered: [],
            showFiltered: false
        }
    }

    handleChange = (query) => {
        let currentList = []
        let newList = []
        if (query !== '') {
            currentList = this.state.contacts
            newList = currentList.filter(item => {
                const lc = item.first_name.toLowerCase()
                const lc2 = item.last_name.toLowerCase()
                const filter = query.toLowerCase()
                return lc.startsWith(filter) || lc2.startsWith(filter)
            })
        } else {
            newList = this.state.contacts
        }
        this.setState({
           filtered: newList,
           showFiltered: true  
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <TopNav />
                <div className={classes.mainContainer}>
                    <Paper>   
                        <Header handleChange={this.handleChange}/>
                        <ColoredLine color="#08b5c3" />    
                        <ContactsTable 
                            showFiltered={this.state.showFiltered}
                            filtered={this.state.filtered}
                            contacts={this.state.contacts}
                        />
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Contacts)