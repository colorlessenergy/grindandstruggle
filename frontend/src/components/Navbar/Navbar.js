import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutAction } from '../../store/actions/authAction'

import classes from './NavBar.module.css';

class NavBar extends Component {
  render() {
    // nav items if user is not logged in
    let NavItems = (
      <nav>
        <ul className={classes.nav}>
          <li><NavLink className={classes['nav__link']} to="/login">Login</NavLink></li>
          <li><NavLink className={classes['nav__link']} to="/">Grind and Struggle</NavLink></li>
          <li><NavLink className={classes['nav__link']} to="/register">Register</NavLink></li>
        </ul>
      </nav>
    );
    // nav items if user is logged in
    if (this.props.isAuthenticated) {
      NavItems = (
        <nav>
          <ul className={classes.nav}>
            <li><NavLink className={classes['nav__link']} to="/create">Create Post</NavLink></li>
            <li><NavLink className={classes['nav__link']} to="/">Grind and Struggle</NavLink></li>
            <li onClick={this.logoutUser} className={classes['nav__link']}>Logout</li>
          </ul>
        </nav>
      );
    }

    return NavItems;
  }

  /**
   * removes the JWT from the database and from localstorage
   */
  logoutUser = () => {
    this.props.logout();
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== undefined
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      return dispatch(logoutAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);