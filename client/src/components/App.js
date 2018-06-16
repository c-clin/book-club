import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as actions from '../store/actions/';
import store from '../store/store';

if (localStorage.jwtToken) {
  axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(actions.setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Landing} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
