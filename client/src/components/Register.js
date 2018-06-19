import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import _ from 'lodash';
import '../css/Forms.css';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: false
  };
  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  registerUser = () => {
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    if (_.some(userData, _.isEmpty)) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      this.props.onRegister(userData, this.props.history);
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
            </div>
            <div className="input-field col s8 offset-s2">
              <input
                type="text"
                name="name"
                className="validate"
                onChange={this.inputChangeHandler}
              />
              <label className="active">Name</label>
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
              onClick={this.registerUser}
              className="btn waves-effect waves-light"
              type="button"
            >
              Sign up
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
    onRegister: (userData, history) =>
      dispatch(actions.registerUser(userData, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Register));
