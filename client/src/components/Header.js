import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import '../css/Header.css';

class Header extends Component {
  state = {
    query: '',
    openDropdown: false
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
    this.props.history.push('/all-books');
    this.props.onLogout();
  };

  toggleDropdown = () => {
    let currentDropdown = this.state.openDropdown;
    this.setState({ openDropdown: !currentDropdown });
  };

  render() {
    console.log(this.props.auth.isAuthenticated);

    const authDropdown = (
      <ul
        id="dropdown1"
        className="dropdown-content"
        style={{ display: this.state.openDropdown ? 'block' : 'none' }}
      >
        <li>
          <Link to="/trade-request">Trade Requests</Link>
        </li>
        <li>
          <Link to="/pending-request">Pending Requests</Link>
        </li>
        <li>
          <a href="" onClick={this.logoutHandler}>
            Logout
          </a>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="right">
        <li>
          <Link to="/dashboard" className="right">
            My Books
          </Link>
        </li>
        <li>
          <a
            className="dropdown-trigger"
            href="#!"
            data-target="dropdown1"
            onClick={this.toggleDropdown}
          >
            Manage<i className="material-icons right">arrow_drop_down</i>
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
      <div className="Header">
        {this.props.auth.isAuthenticated ? authDropdown : null}
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="left brand-logo">
              Book Club
            </Link>
            {this.props.auth.isAuthenticated ? authLinks : guestLinks}
            <ul className="right">
              <li>
                <form classNam="book-search">
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
                </form>
              </li>
              <li>
                <Link to="all-books" className="right">
                  All Books
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
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
