import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    console.log(this.props.auth.isAuthenticated);

    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            Book Club
          </Link>
          <ul className="right">
            <li>
              <a href="/api/logout">Logout</a>
            </li>
            <li>
              <Link to="/login" className="right">
                login
              </Link>
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

export default connect(mapStateToProps)(Header);
