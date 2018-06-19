import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import '../../css/BookItem.css';

const BookTradeItem = props => {
  let tradeBtn =
    props.auth.isAuthenticated && props.status === 'available' ? (
      <button onClick={() => props.onTradeBook(props)}>Trade</button>
    ) : null;

  let onHoldText =
    props.auth.isAuthenticated && props.status === 'pending' ? (
      <div className="purple-text text-purple lighten-2">
        <p>On Hold</p>
      </div>
    ) : null;

  return (
    <div className="BookItem">
      <h5 className="book-item-title">{props.title}</h5>
      <p className="book-item-author">{props.author}</p>
      <p className="book-item-link">
        <a href={props.link}>Website</a>
      </p>
      <div className="book-item-image">
        <img src={props.image} alt={props.title} width="128" />
      </div>
      <p className="book-item-owner">Owned by: {props.username} </p>
      {tradeBtn}
      {onHoldText}
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
    onTradeBook: props => dispatch(actions.onTradeRequest(props))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookTradeItem);
