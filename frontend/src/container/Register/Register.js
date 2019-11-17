import React, { Component } from 'react';

import { registerAction } from '../../store/actions/authAction';

import { connect } from 'react-redux';

class Register extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    error: ''
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">
            username
          </label>
          <input 
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            type="text" 
            name="username" 
            id="username"
            ref="username" />
        </div>
        <div>
          <label htmlFor="email">
            email
          </label>
          <input 
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            type="email" 
            name="email" 
            id="email"
            ref="email" />
        </div>
        <div>
          <label htmlFor="password">
            password
          </label>
          <input 
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            type="password" 
            name="password" 
            id="password"
            ref="password" />
        </div>

        <div>
          <button>
            create
          </button>
        </div>

        <p>
          { this.state.error }
        </p>

        <p>
          { this.props.authError }
        </p>
      </form>
    )
  }

  handleFocus = (ev) => {
    ev.target.classList.remove('error');
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let errorMessage = '';
    // check if inputs are empty
    if (!this.state.username) {
      errorMessage = 'Missing Username!';
      this.refs.username.classList.add('error');
    } 

    if (!this.state.email) {
      errorMessage += 'Missing Email!';
      this.refs.email.classList.add('error');      
    }

    if (!this.state.password) {
      errorMessage += 'Missing Password';
      this.refs.password.classList.add('error');
    }

    if (errorMessage) {
      return this.setState({
        error: errorMessage
      });
    }

    this.props.registerUser(this.state, this.props.history);

    this.setState({
      error: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user, history) => {
      dispatch(registerAction(user, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);