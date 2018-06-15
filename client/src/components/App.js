import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actions from '../store/actions/';
import store from '../store/store';

if (localStorage.jwtToken) {
  axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(actions.setCurrentUser(decoded));
}

const SignUp = () => <h3>Sign up Page</h3>;

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
