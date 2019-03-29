import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import {Security, SecureRoute, ImplicitCallback } from '@okta/okta-react'
import Home from './components/pages/Home'
import NewSnippet from './components/pages/NewSnippet'
import Profile from './components/pages/Profile'
import Login from './components/auth/signIn'
import config from './app.config'
import SignUp from './components/auth/SignUp';
function onAuthRequired({history}){
  history.push('/login')
}
class App extends Component {
  render() {
    return (

      <Router >
          <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
                  onAuthRequired={onAuthRequired} >
          <div className="root">
            <SecureRoute path="/" exact={true} component={Home}/>
            <SecureRoute path="/new-snippet" exact={true} component={NewSnippet}/>
            <SecureRoute path="/profile" exact={true} component={Profile}/>
            <SecureRoute path="/snippets" exact={true} component={Home}/>
            <Route path="/register" exact={true} component={SignUp}/>
            <Route path='/login' render={() => <Login baseUrl={config.url}/>} />
            <Route path='/implicit/callback' component={ImplicitCallback} />
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
