import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Register-Login.module.css';

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
      <div className={classes['contain']}>

        <div className={classes['info-contain']}>

          <div className={classes['info']}>

            <h3 className={classes['info__title']}>
              Want to write about your thoughts
            </h3>
            <p className={classes['info__content']}>
              Create an account
            </p>
          </div>

          <div className={classes['info']}>
            <h3 className={classes['info__title']}>
              Share your exprience with others
            </h3>
            <p className={classes['info__content']}>
              share your grind and struggle to help others achieve their dreams
            </p>
          </div>
        </div>

        <div className={classes['form-contain']}>          
          <form
            className={classes['form']} 
            onSubmit={this.handleSubmit}>

            <div className={classes["form-group"]}>
              <label 
                className={classes["form-group__label"]}
                htmlFor="username">
                username
              </label>
              <input
                className={classes["form-group__input"]}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                placeholder='Enter your username...'
                type="text"
                name="username"
                id="username"
                ref="username" />
            </div>

            <div className={classes["form-group"]}>
              <label 
                htmlFor="email"
                className={classes["form-group__label"]} >
                email
              </label>
              <input
                className={classes["form-group__input"]}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                placeholder="Enter your email..."
                type="email"
                name="email"
                id="email"
                ref="email" />
            </div>

            <div className={classes["form-group"]}>
              <label 
                htmlFor="password"
                className={classes["form-group__label"]}>
                password
            </label>
              <input
                className={classes["form-group__input"]}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                placeholder='Enter your password...'
                type="password"
                name="password"
                id="password"
                ref="password" />
            </div>

            <div className={classes['button-contain']}>
              <button
                className={classes['button']}>
                create
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
              have an account? 
              <Link 
                className={classes['cta__link']} 
                to='/login'>
                  Login</Link>
            </p>
          </div>
        </div>
      </div>
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