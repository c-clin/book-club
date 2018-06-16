import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

export class BookStatusItem extends Component {
  render() {
    let actionBtn =
      this.props.status === 'not-available' ? (
        <button onClick={() => this.props.onTradeStatus(this.props)}>
          Trade this book!
        </button>
      ) : (
        <button onClick={() => this.props.onTradeStatus(this.props)}>
          Keep this book!
        </button>
      );
    return (
      <div style={{ width: '400px' }}>
        <h5>{this.props.title}</h5>
        <p>{this.props.author}</p>
        <p>
          <a href={this.props.link}>Website</a>
        </p>
        <img src={this.props.image} alt={this.props.title} width="128" />
        {actionBtn}
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
    onTradeStatus: data => dispatch(actions.onTradeBook(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookStatusItem);
