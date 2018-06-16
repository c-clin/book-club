import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginUser = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.onLogin(userData, this.props.history);
  };

  render() {
    return (
      <div>
        <form className="col s6" style={{ marginTop: '30px' }}>
          <div className="row">
            <div className="input-field col s8 offset-s2">
              <input
                type="email"
                name="email"
                className="validate"
                onChange={this.inputChangeHandler}
              />
              <label className="active">Email</label>
            </div>
            <div className="input-field col s8 offset-s2">
              <input
                type="password"
                name="password"
                className="validate"
                onChange={this.inputChangeHandler}
              />
              <label className="active">Password</label>
            </div>
          </div>
          <div className="right-align" style={{ marginRight: '10%' }}>
            <button
              onClick={this.loginUser}
              className="btn waves-effect waves-light"
              type="button"
            >
              Login
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userData, history) =>
      dispatch(actions.loginUser(userData, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
