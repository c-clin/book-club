import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import '../css/Header.css';

class Header extends Component {
  state = {
    query: '',
    openDropdown: false,
    openBurgerIcon: false
  };

  inputChangeHandler = event => {
    this.setState({ query: event.target.value });
  };

  searchBookHandler = () => {
    this.props.books.loading = true;
    this.props.onSearchBook(this.state.query);
    this.props.history.push('/search');
    this.setState({ query: '' });
  };

  checkEnterHandler = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchBookHandler();
    }
  };

  loginHandler = e => {
    e.preventDefault();
    this.props.history.push('/login');
    this.setState({ openDropdown: false });
  };

  logoutHandler = e => {
    e.preventDefault();
    this.props.history.push('/all-books');
    this.props.onLogout();
    this.setState({ openDropdown: false });
  };

  toggleDropdown = () => {
    if (this.props.auth.user) {
      this.props.loadRequests(this.props.auth.user.id, 'pending');
      this.props.loadRequests(this.props.auth.user.id, 'trade');
    }
    let currentDropdown = this.state.openDropdown;
    this.setState({ openDropdown: !currentDropdown });
  };

  render() {
    const authDropdown = (
      <ul
        id="dropdown1"
        className="dropdown-content"
        style={{ display: this.state.openDropdown ? 'block' : 'none' }}
      >
        <li>
          <Link to="all-books">All Books</Link>
        </li>
        <li>
          <Link to="/dashboard">My Books</Link>
        </li>
        <li>
          <Link to="/trade-request">
            Trade Requests &nbsp;
            <span className="req-count">
              {this.props.books.tradeRequests.length}
            </span>
          </Link>
        </li>
        <li>
          <Link to="/pending-request">
            Pending Requests &nbsp;
            <span className="req-count">
              {this.props.books.pendingRequests.length}
            </span>
          </Link>
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

    const guestDropdown = (
      <ul
        id="dropdown1"
        className="dropdown-content"
        style={{ display: this.state.openDropdown ? 'block' : 'none' }}
      >
        <li>
          <Link to="all-books">All Books</Link>
        </li>
        <li>
          <a href="" onClick={this.loginHandler}>
            Login
          </a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav-burger right">
        <a
          className="dropdown-trigger"
          href="#!"
          data-target="dropdown1"
          onClick={this.toggleDropdown}
        >
          <li>
            <div className="nav-burger-icon">
              <span className="nav-burger-icon-line" />
              <span className="nav-burger-icon-line" />
              <span className="nav-burger-icon-line" />
            </div>
          </li>
        </a>
      </ul>
    );

    return (
      <div className="Header">
        {this.props.auth.isAuthenticated ? authDropdown : guestDropdown}
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="left brand-logo header">
              Book Club
            </Link>

            {this.props.auth.isAuthenticated ? authLinks : guestLinks}
            <ul className="input-ul">
              <li className="input-li">
                <form className="book-search valign-wrapper">
                  <input
                    onChange={this.inputChangeHandler}
                    value={this.state.query}
                    placeholder="Search book.."
                    onKeyDown={this.checkEnterHandler}
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
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchBook: search => dispatch(actions.onFetchBook(search)),
    onLogout: () => dispatch(actions.logoutUser()),
    loadRequests: (user, pending) =>
      dispatch(actions.onLoadTradeRequests(user, pending))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
