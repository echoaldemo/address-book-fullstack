import React, { Component } from 'react'
import Home from './registration/home'
import Contacts from './main/contacts'
import Auth from './auth/auth'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/contacts" component={Contacts} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={Home} />       
        </Switch>
      </BrowserRouter>
    )
  }
}
