import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

export class BookStatusItem extends Component {
  actionBtn = () => {
    switch (this.props.status) {
      case 'available':
        return (
          <button onClick={() => this.props.onTradeStatus(this.props)}>
            Keep this book!
          </button>
        );
      case 'not-available':
        return (
          <button onClick={() => this.props.onTradeStatus(this.props)}>
            Trade this book!
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
      <div style={{ width: '150px' }}>
        <h5>{this.props.title}</h5>
        <p>{this.props.author}</p>
        <p>
          <a href={this.props.link} target="_blank">
            Website
          </a>
        </p>
        <img src={this.props.image} alt={this.props.title} width="128" />
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
    onTradeStatus: data => dispatch(actions.onTradeBook(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookStatusItem);
