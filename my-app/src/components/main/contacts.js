import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { CssBaseline, Paper } from '@material-ui/core'
import axios from 'axios'

import TopNav from './topNav'
import Header from './header'
import ContactsTable from './contactsTable'
import InputHead from './inputHead'

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
    minHeight: {
        minHeight: '89vh'
    }
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

const id = localStorage.getItem('id');

class Contacts extends Component {
    constructor(){
        super()
        this.state = {
            contacts: [],
            filtered: [],
            showFiltered: false,
            dataLoaded: false
        }
    }

    componentDidMount(){
        axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/all/${id}`)
            .then(response => {
                const arr = JSON.stringify(response.data, function (key, value) { return value || "" })
                this.setState({
                    contacts: JSON.parse(arr),
                    dataLoaded: true
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    updateContacts = () => {
        axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/all/${id}`)
            .then(response => {
                const arr = JSON.stringify(response.data, function (key, value) { return value || "" })
                this.setState({
                    contacts: JSON.parse(arr),
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    sortHandler = (params) => {
        axios.post(process.env.REACT_APP_BASE_URL + `/api/contacts/sort/${id}`, params)
            .then(response => {
                const arr = JSON.stringify(response.data, function (key, value) { return value || "" })
                this.setState({
                    contacts: JSON.parse(arr),
                })
            })
            .catch(error => {
                console.error(error)
            })
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
                    <Paper className={classes.minHeight}>   
                        <Header handleAdd={this.updateContacts}/>
                        <ColoredLine color="#08b5c3" />    
                        {this.state.dataLoaded
                        ?
                        <React.Fragment>
                            <InputHead handleChange={this.handleChange} sortHandler={this.sortHandler} />
                            <ContactsTable 
                                updateContacts={this.updateContacts}
                                showFiltered={this.state.showFiltered}
                                filtered={this.state.filtered}
                                contacts={this.state.contacts}
                            />
                        </React.Fragment>
                        : null
                        }
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Contacts))