import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import '../../css/BookItem.css';

export class BookStatusItem extends Component {
  actionBtn = () => {
    switch (this.props.status) {
      case 'available':
        return (
          <button
            className="waves-effect waves-light btn"
            style={{ fontSize: '12px' }}
            onClick={() => this.props.onTradeStatus(this.props)}
          >
            Keep book
          </button>
        );
      case 'not-available':
        return (
          <button
            className="waves-effect waves-light btn"
            style={{ fontSize: '12px' }}
            onClick={() => this.props.onTradeStatus(this.props)}
          >
            Trade book
          </button>
        );
      case 'pending':
        return <p>Someone made a request for this book!</p>;
      default:
        return;
    }
  };

  render() {
    return (
      <div className="BookItem hoverable">
        <div className="right-align" style={{ height: '19px' }}>
          <i
            onClick={() => this.props.onDeleteBook(this.props.apiID)}
            className="tiny material-icons delete-btn"
          >
            delete_forever
          </i>
        </div>
        <h5 className="book-item-title">{this.props.title}</h5>
        <p className="book-item-author">By: {this.props.author}</p>
        <p className="book-item-link">
          <a href={this.props.link} target="_blank">
            Website
          </a>
        </p>
        <div className="book-item-image">
          <img src={this.props.image} alt={this.props.title} width="128" />
        </div>
        {this.actionBtn()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTradeStatus: data => dispatch(actions.onTradeBook(data)),
    onDeleteBook: data => dispatch(actions.onDeleteBook(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookStatusItem);
