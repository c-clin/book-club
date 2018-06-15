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
    this.setState({ email: '', password: '' });
  };

  render() {
    return (
      <div>
        <form className="col s6">
          <div className="row">
            <div className="input-field col s8">
              <i className="material-icons prefix">email</i>
              <input
                id="icon_prefix"
                type="email"
                name="email"
                className="validate"
                onChange={this.inputChangeHandler}
              />
              <label className="active">Email</label>
            </div>
            <div className="input-field col s8">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="icon_prefix"
                type="password"
                name="password"
                className="validate"
                onChange={this.inputChangeHandler}
              />
              <label className="active">Password</label>
            </div>
          </div>
        </form>
        <button
          onClick={this.loginUser}
          className="btn waves-effect waves-light"
          type="button"
        >
          Login
          <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, pw) => dispatch(actions.loginUser(email, pw))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
