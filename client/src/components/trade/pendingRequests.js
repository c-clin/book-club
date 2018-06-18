import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

export class PendingRequests extends Component {
  componentDidMount = () => {
    this.props.onLoadRequests(this.props.auth.user.id, 'pending');
  };

  pendingRequests = () => {
    let counter = 0;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {this.props.books.pendingRequests.map(req => {
            counter++;
            return (
              <tr key={counter}>
                <td>{counter}</td>
                <td>{req.title}</td>
                <td>{new Date(req.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => this.props.cancelPendingReq(req)}>
                    Cancel
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
    const noReqMsg = <p>You have no pending requests right now!</p>;
    return (
      <div>
        {this.props.books.pendingRequests ? this.pendingRequests() : null}
        {this.props.books.pendingRequests.length === 0 ? noReqMsg : null}
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
    onLoadRequests: (user, pending) =>
      dispatch(actions.onLoadTradeRequests(user, pending)),
    cancelPendingReq: reqData =>
      dispatch(actions.cancelPendingRequests(reqData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingRequests);
