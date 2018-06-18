import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import BookStatusItem from './books/BookStatusItem';

import './books/BookItem.css';

export class Dashboard extends Component {
  componentDidMount = () => {
    this.props.onLoadList();
  };

  render() {
    const renderContent = this.props.books.bookList.map(book => {
      return (
        <BookStatusItem
          key={book.title}
          title={book.title}
          author={book.author}
          link={book.link}
          apiID={book.apiID}
          image={book.imgURL}
          status={book.status}
        />
      );
    });

    return (
      <div>
        {/* TODO: add your pending and trade request on top */}
        {this.props.auth.user ? (
          <span>Hello, {this.props.auth.user.name}!</span>
        ) : null}

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
    onLoadList: () => dispatch(actions.onLoadList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
