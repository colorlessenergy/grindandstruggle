import React, { Component } from 'react';

import {connect} from 'react-redux';

import { loginAction } from '../../store/actions/authAction';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>
          <input 
            type="email"
            name="email"
            id="email"
            ref="email"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            />
        </div>
        <div>
          <label htmlFor="password">
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            ref="password"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
        </div>

        <div>
          <button>
            Login
          </button>

          <p>
            { this.state.error }
          </p>

          <p>
            {this.props.authError}
          </p>
        </div>
      </form>
    )
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  handleFocus = (ev) => {
    ev.target.classList.remove('error');
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let errorMessage = '';

    if (!this.state.email) {
      errorMessage = 'Missing Email';

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

    this.props.loginUser(this.state, this.props.history);

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
    loginUser: (user, history) => {
      dispatch(loginAction(user, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);