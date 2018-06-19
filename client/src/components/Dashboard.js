import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import BookStatusItem from './books/BookStatusItem';

import '../css/BookItemContainer.css';

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

    let welcomeMsg;
    if (this.props.books.bookList.length > 0) {
      welcomeMsg = (
        <p className="welcome-message">
          Welcome back, {this.props.auth.user.name.split(' ')[0]}!
        </p>
      );
    } else {
      welcomeMsg = (
        <p className="welcome-message">
          Welcome, {this.props.auth.user.name.split(' ')[0]}! You can start
          adding books to your list!
        </p>
      );
    }

    let dashBoardContent;
    if (this.props.books.loading === true) {
      dashBoardContent = (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    } else {
      dashBoardContent = (
        <div>
          {welcomeMsg}
          <div className="BookItem-container">{renderContent}</div>
        </div>
      );
    }

    return <div className="layout-container">{dashBoardContent}</div>;
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
