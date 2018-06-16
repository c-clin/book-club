import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import BookResultItem from './books/BookResultItem';

export class Dashboard extends Component {
  componentDidMount = () => {
    this.props.onLoadList();
  };

  render() {
    const renderContent = this.props.books.bookList.map(book => {
      return (
        <BookResultItem
          key={book.title}
          title={book.title}
          author={book.author}
          // link={book.link}
          date={book.date}
          image={book.imgURL}
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
