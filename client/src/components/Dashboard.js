import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import BookStatusItem from './books/BookStatusItem';

import '../css/BookItemContainer.css';

export class Dashboard extends Component {
  componentWillMount() {
    this.props.books.loading = true;
  }

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
          bookID={book._id}
          image={book.imgURL}
          status={book.status}
        />
      );
    });

    let noBooksMsg = (
      <p className="welcome-message">
        Looks like you don't have any books right now.
      </p>
    );

    let dashBoardContent;
    if (this.props.books.loading === true) {
      dashBoardContent = <div className="loader">Loading...</div>;
    } else {
      dashBoardContent = (
        <div>
          <p className="welcome-message">
            Hi, {this.props.auth.user.name.split(' ')[0]}!
          </p>
          {this.props.books.bookList.length === 0 ? noBooksMsg : null}
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
