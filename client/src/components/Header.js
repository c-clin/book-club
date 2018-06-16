import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions';

class Header extends Component {
  logoutHandler = e => {
    e.preventDefault();
    console.log('logout clicked');
    this.props.logoutUser();
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
