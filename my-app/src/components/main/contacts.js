import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { CssBaseline, Paper } from '@material-ui/core'
import axios from 'axios'

import TopNav from './topNav'
import Header from './header'
import ContactsTable from './contactsTable'
import InputHead from './inputHead'
import GroupsTable from './group/groupsTable'

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
        marginTop: '20px',
        '@media (max-width: 650px)' : {
            margin: '0',
            width: '100%',
        } 
    },
    minHeight: {
        minHeight: '88vh',
        '@media (max-width: 650px)' : {
            minHeight: '91.5vh'
        },
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

class Contacts extends Component {
    constructor(props){
        super(props)
        this.state = {
            contacts: [],
            groups: [],
            filtered: [],
            showFiltered: false,
            dataLoaded: false,
            viewGroups: false,
            config: {},
            id: '',
            token: ''
        }
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.history.push('/');
        }
        else{
            document.title = 'Address Book'
            const head = `Bearer ${localStorage.getItem('token')}`
            this.setState({
                config: {
                    headers: {authorization: head}
                },
                id: localStorage.getItem('id'),
                token: localStorage.getItem('token')
            })

            axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/all/${localStorage.getItem('id')}`, {headers : {authorization: head}})
                .then(response => {
                    const arr = JSON.stringify(response.data, function (key, value) { return value || "" })
                    this.setState({
                        contacts: JSON.parse(arr),
                        dataLoaded: true
                    })
                })
                .then(() => {
                    axios.get(process.env.REACT_APP_BASE_URL + `/api/groups/${localStorage.getItem('id')}`, {headers : {authorization: head}})
                    .then(response => {
                        this.setState({
                            groups: response.data,
                        })
                    })
                })
                .catch(error => {
                    console.error(error)
                    this.props.history.push('/auth')
                })
        }
    }

    updateContacts = () => {
        axios.get(process.env.REACT_APP_BASE_URL + `/api/contacts/all/${this.state.id}`, this.state.config)
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

    updateGroups = () => {
        axios.get(process.env.REACT_APP_BASE_URL + `/api/groups/${this.state.id}`, this.state.config)
            .then(response => {
                this.setState({
                    groups: response.data,
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    sortHandler = (params) => {
        axios.post(process.env.REACT_APP_BASE_URL + `/api/contacts/sort/${this.state.id}`, params, this.state.config)
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

    handleViewGroup = () => {
        this.setState({
            viewGroups: !this.state.viewGroups
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
                        <Header viewGroups={this.state.viewGroups} updateGroups={this.updateGroups} handleViewGroup={this.handleViewGroup} handleAdd={this.updateContacts}/>
                        <ColoredLine color="#08b5c3" />    
                        {this.state.dataLoaded && !this.state.viewGroups
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
                        {this.state.viewGroups
                        ?  <GroupsTable updateGroups={this.updateGroups} groups={this.state.groups}/>
                        : null
                        }
                        
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(Contacts))