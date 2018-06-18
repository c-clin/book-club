import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import BookStatusItem from './books/BookStatusItem';

import './books/BookItem.css';

export class Dashboard extends Component {
  componentDidMount = () => {
    this.props.onLoadList();
    this.props.onLoadRequests(this.props.auth.user.id);
  };

  tradeRequests = () => {
    let counter = 0;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* map through the trade list */}
          {this.props.books.tradeRequests.map(req => {
            counter++;
            return (
              <tr>
                <td>{counter}</td>
                <td>{req.title}</td>
                <td>
                  <button
                    onClick={() => this.props.onAcceptRequest(req, 'accept')}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => this.props.onAcceptRequest(req, 'deny')}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
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

    return (
      <div>
        {/* TODO: add your pending and trade request on top */}
        {this.props.auth.user ? (
          <span>Hello, {this.props.auth.user.name}!</span>
        ) : null}

        {this.props.books.tradeRequests ? this.tradeRequests() : null}

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
    onLoadList: () => dispatch(actions.onLoadList()),
    onLoadRequests: user => dispatch(actions.onLoadTradeRequests(user)),
    onAcceptRequest: (reqData, decision) =>
      dispatch(actions.onAcceptRequest(reqData, decision))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
