import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const BookStatusItem = props => {
  let actionBtn =
    props.status === 'not-available' ? (
      <button>Trade this book!</button>
    ) : (
      <button>Keep this book!</button>
    );
  return (
    <div style={{ width: '400px' }}>
      <h5>{props.title}</h5>
      <p>{props.author}</p>
      <p>
        <a href={props.link}>Website</a>
      </p>
      <img src={props.image} alt={props.title} width="128" />
      {actionBtn}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    books: state.books,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookStatusItem);
