import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
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
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
