import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import '../css/Landing.css';

class Landing extends Component {
  state = {
    query: ''
  };

  inputChangeHandler = event => {
    this.setState({ query: event.target.value });
  };

  searchBookHandler = () => {
    this.props.onSearchBook(this.state.query);
    this.props.history.push('/search');
  };

  render() {
    return (
      <div className="Landing">
        <div className="row landing-container">
          <form className="col s12">
            <div className="row">
              <div className="header col s6 offset-s3 center-align">
                <h1>Book Club</h1>
                <p>Join a community of friendly book lovers!</p>
              </div>
            </div>
          </form>
        </div>
        <div className="row features-container">
          <div className="col s12" />
          <div className="row">
            <div className="col s4 center-align">
              <i className="medium material-icons">library_books</i>
              <h5>Book Catalogue</h5>
              <p>
                Access a list of all the available books from other users that
                are ready to be borrowed.
              </p>
            </div>
            <div className="col s4 center-align">
              <i className="medium material-icons">search</i>
              <h5>Book Search</h5>
              <p>
                Explore from an extensive library of books and easily find more
                information if needed.
              </p>
            </div>
            <div className="col s4 center-align">
              <i className="medium material-icons">swap_horiz</i>
              <h5>Book Exchange</h5>
              <p>
                Manage the book exchanges safely through your private dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchBook: search => dispatch(actions.onFetchBook(search))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Landing);
