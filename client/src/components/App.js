import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import BookResult from './books/BookResult';
import BooksForTrade from './books/BooksForTrade';
import TradeRequests from './trade/tradeRequests';
import PendingRequests from './trade/pendingRequests';

import axios from '../axios-api';
import jwt_decode from 'jwt-decode';
import * as actions from '../store/actions/';
import store from '../store/store';

if (localStorage.jwtToken) {
  axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(actions.setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date().now / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(actions.logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/all-books" component={BooksForTrade} />
            <Route exact path="/search" component={BookResult} />
            <div className="container">
              <Route exact path="/trade-request" component={TradeRequests} />
              <Route
                exact
                path="/pending-request"
                component={PendingRequests}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
