import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

export class TradeRequests extends Component {
  componentDidMount = () => {
    this.props.onLoadRequests(this.props.auth.user.id, 'trade');
  };

  tradeRequests = () => {
    let counter = 0;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>From</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* map through the trade list */}
          {this.props.books.tradeRequests.map(req => {
            counter++;
            return (
              <tr key={counter}>
                <td>{counter}</td>
                <td>{req.title}</td>
                <td>{req.from_name}</td>
                <td>{new Date(req.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => this.props.onRespondingToReq(req, 'accept')}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => this.props.onRespondingToReq(req, 'deny')}
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
    const noReqMsg = <p>You have no trade requests right now!</p>;

    return (
      <div style={{ paddingTop: '90px' }}>
        {this.props.books.tradeRequests ? this.tradeRequests() : null}
        {this.props.books.tradeRequests.length === 0 ? noReqMsg : null}
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
    onLoadRequests: (user, trade) =>
      dispatch(actions.onLoadTradeRequests(user, trade)),
    onRespondingToReq: (reqData, decision) =>
      dispatch(actions.respondToRequests(reqData, decision))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeRequests);
