import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions';
import _ from 'lodash';
import '../css/Forms.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false
  };

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginUser = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    if (_.some(userData, _.isEmpty)) {
      this.setState({ error: true });
    } else {
      this.props.auth.loading = true;
      this.setState({ error: false });
      this.props.onLogin(userData, this.props.history);
    }
  };

  render() {
    const errMsg = <p style={{ color: 'red' }}>Please fill in all fields!</p>;
    return (
      <div className="Form">
        <form className="col s6 form-container">
          <div className="row">
            <div
              className="input-field col s8 offset-s2"
              style={{ marginBottom: '20px' }}
            >
              {this.state.error ? errMsg : null}
              <p style={{ color: 'red' }}>
                {this.props.auth.error ? this.props.auth.error : null}
              </p>
            </div>
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userData, history) =>
      dispatch(actions.loginUser(userData, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
