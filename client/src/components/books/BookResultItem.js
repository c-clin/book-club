import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const BookResultItem = props => {
  let addBookBtn = props.auth.isAuthenticated ? (
    <button onClick={() => props.onAddBook(props)}>Add Book</button>
  ) : null;

  return (
    <div style={{ width: '150px' }}>
      <h5>{props.title}</h5>
      <p>{props.author}</p>
      <p>
        <a href={props.link}>Website</a>
      </p>
      <img src={props.image} alt={props.title} width="128" />
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
