import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classes from '../Register-Login.module.css'

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
      <div className={[classes['form-contain'], classes['form-contain--login']].join(' ')}>
        <form
          className={classes['form']} 
          onSubmit={this.handleSubmit}>

          <div className={classes["form-group"]}>
            <label
              className={classes["form-group__label"]} 
              htmlFor="email">
              Email
            </label>
            <input
              className={classes["form-group__input"]}
              type="email"
              placeholder="Enter your email..."
              name="email"
              id="email"
              ref="email"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </div>

          <div className={classes["form-group"]}>
            <label
              className={classes["form-group__label"]} 
              htmlFor="password">
              password
            </label>
            <input
              className={classes["form-group__input"]}
              placeholder="Enter your password..."
              type="password"
              name="password"
              id="password"
              ref="password"
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </div>

          <div className={classes['button-contain']}>
            <button
              className={classes['button']}>
              Login
            </button>
          </div>

          <div className={classes['error-message']}>
            <p>
              {this.state.error}
            </p>

            <p>
              {this.props.authError}
            </p>
          </div>
        </form>
        <div className={classes['cta']}>
          <p>
            don't have an account?
            <Link
              className={classes['cta__link']}
              to='/register'>
              register</Link>
          </p>
        </div>
      </div>
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

    this.setState({
      email: this.state.email.toLowerCase().trim(),
      error: ''
    }, () => {
      this.props.loginUser(this.state, this.props.history);    
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