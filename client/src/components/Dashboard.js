import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import BookStatusItem from './books/BookStatusItem';

export class Dashboard extends Component {
  componentDidMount = () => {
    this.props.onLoadList();
  };

  render() {
    const renderContent = this.props.books.bookList.reverse().map(book => {
      return (
        <BookStatusItem
          key={book.title}
          title={book.title}
          author={book.author}
          // link={book.link}
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
)(Dashboard);
