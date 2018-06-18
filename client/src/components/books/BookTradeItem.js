import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

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
    <div style={{ width: '150px' }}>
      <h5>{props.title}</h5>
      <p>{props.author}</p>
      <p>
        <a href={props.link}>Website</a>
      </p>
      <img src={props.image} alt={props.title} width="128" />
      <p>Owned by {props.username} </p>
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
