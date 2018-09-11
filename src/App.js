import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppNavbar from './components/layout/AppNavbar'
import Dashboard from './components/layout/Dashboard'
import AddClient from './components/clients/AddClient'
import EditClient from './components/clients/EditClient'
import ClientDetails from './components/clients/ClientDetails'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Settings from './components/settings/Settings'
import NotFound from './components/layout/NotFound'

import { Provider } from 'react-redux'
import store from './store/store'

import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/auth'

import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
                <Route component={UserIsAuthenticated(NotFound)} />

              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
