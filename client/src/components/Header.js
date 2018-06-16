import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class Header extends Component {
  state = {
    query: ''
  };

  inputChangeHandler = event => {
    this.setState({ query: event.target.value });
  };

  searchBookHandler = () => {
    this.props.onSearchBook(this.state.query);
    this.props.history.push('/search');
    this.setState({ query: '' });
  };

  logoutHandler = e => {
    e.preventDefault();
    console.log('logout clicked');
    this.props.onLogout();
  };

  render() {
    console.log(this.props.auth.isAuthenticated);

    const authLinks = (
      <ul className="right">
        <li>
          {this.props.auth.user ? (
            <span>Hello, {this.props.auth.user.name}!</span>
          ) : null}
        </li>
        <li>
          <a href="" onClick={this.logoutHandler}>
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="right">
        <li>
          <Link to="/login" className="right">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="right">
            Register
          </Link>
        </li>
      </ul>
    );

    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            Book Club
          </Link>
          {this.props.auth.isAuthenticated ? authLinks : guestLinks}
          <ul className="right">
            <li>
              <input
                type="text"
                onChange={this.inputChangeHandler}
                style={{ width: '150px' }}
                value={this.state.query}
              />
              <i
                className="material-icons right"
                onClick={this.searchBookHandler}
                style={{ marginLeft: '0', cursor: 'pointer' }}
              >
                search
              </i>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchBook: search => dispatch(actions.onFetchBook(search)),
    onLogout: () => dispatch(actions.logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
