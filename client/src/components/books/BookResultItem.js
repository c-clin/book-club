import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import '../../css/BookItem.css';

export class BookResultItem extends Component {
  state = {
    addBtn: 'Add Book'
  };

  clickButtonHandler = () => {
    this.setState({ addBtn: 'Book Added' });
    this.props.onAddBook(this.props);
  };

  render() {
    let addBookBtn = this.props.auth.isAuthenticated ? (
      <button
        className="waves-effect waves-light btn"
        style={{ fontSize: '11px' }}
        onClick={this.clickButtonHandler}
      >
        {this.state.addBtn}
      </button>
    ) : null;

    return (
      <div className="BookItem hoverable">
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
        {addBookBtn}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // books: state.books,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddBook: bookData => dispatch(actions.onAddBook(bookData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookResultItem);
