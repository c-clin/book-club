import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import BookTradeItem from './BookTradeItem';

import '../../css/BookItemContainer.css';

export class BooksForTrade extends Component {
  componentDidMount = () => {
    this.props.onLoadList();
  };

  render() {
    const renderContent = this.props.books.availableBooks.map(book => {
      return (
        <BookTradeItem
          key={book.title}
          title={book.title}
          author={book.author}
          apiID={book.apiID}
          image={book.imgURL}
          status={book.status}
          owner={book._user}
          link={book.link}
          username={book.ownerName}
          bookID={book._id}
        />
      );
    });

    let welcomeMessage;
    this.props.books.availableBooks.length > 0
      ? (welcomeMessage = <p className="welcome-message">Available books: </p>)
      : (welcomeMessage = (
          <p className="welcome-message">
            Oops there are no books to exchange right now!
          </p>
        ));

    const errorMessage = (
      <p
        style={{
          margin: '0',
          padding: '85px 40px 0 40px',
          backgroundColor: '#ffecd4'
        }}
      >
        You must <Link to="/login">log in</Link> to trade!
      </p>
    );

    return (
      <div className="layout-container" style={{ paddingTop: '30px' }}>
        {this.props.auth.isAuthenticated ? null : errorMessage}
        {this.props.auth.isAuthenticated ? welcomeMessage : null}
        <div className="BookItem-container">{renderContent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, action) => {
  return {
    auth: state.auth,
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadList: () => dispatch(actions.onLoadBooksForTrade())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksForTrade);
