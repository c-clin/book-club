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
          username={book.ownerName}
          bookID={book._id}
        />
      );
    });

    const errorMessage = (
      <p
        style={{
          margin: '0',
          padding: '10px 40px',
          backgroundColor: '#ffecd4'
        }}
      >
        You must <Link to="/login">log in</Link> to trade!
      </p>
    );

    return (
      <div className="layout-container" style={{ paddingTop: '60px' }}>
        {this.props.auth.isAuthenticated ? null : errorMessage}
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
