import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import '../../css/BookItem.css';

const BookResultItem = props => {
  let addBookBtn = props.auth.isAuthenticated ? (
    <button
      className="waves-effect waves-light btn"
      onClick={() => props.onAddBook(props)}
    >
      Add Book
    </button>
  ) : null;

  return (
    <div className="BookItem hoverable">
      <h5 className="book-item-title">{props.title}</h5>
      <p className="book-item-author">By: {props.author}</p>
      <p className="book-item-link">
        <a href={props.link} target="_blank">
          Website
        </a>
      </p>
      <div className="book-item-image">
        <img src={props.image} alt={props.title} width="128" />
      </div>
      {addBookBtn}
    </div>
  );
};

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
