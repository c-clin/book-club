import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class Landing extends Component {
  state = {
    query: ''
  };

  inputChangeHandler = event => {
    this.setState({ query: event.target.value });
  };

  searchBookHandler = () => {
    this.props.onSearchBook(this.state.query);
    this.props.history.push('/search');
  };

  render() {
    return (
      <div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="text"
                  value={this.state.query}
                  onChange={this.inputChangeHandler}
                />
                <button
                  className="btn waves-effect waves-light"
                  type="button"
                  onClick={this.searchBookHandler}
                >
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchBook: search => dispatch(actions.onFetchBook(search))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Landing);
