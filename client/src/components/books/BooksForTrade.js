import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import BookTradeItem from './BookTradeItem';

export class BooksForTrade extends Component {
  componentDidMount = () => {
    this.props.onLoadList();
  };

  render() {
    const availableBooks = this.props.books.bookList.filter(book => {
      return book.status === 'available';
    });

    const renderContent = availableBooks.map(book => {
      return (
        <BookTradeItem
          key={book.title}
          title={book.title}
          author={book.author}
          apiID={book.apiID}
          image={book.imgURL}
          status={book.status}
        />
      );
    });
    return <div>{renderContent}</div>;
  }
}

const mapStateToProps = (state, action) => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadList: () => dispatch(actions.onLoadList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksForTrade);
