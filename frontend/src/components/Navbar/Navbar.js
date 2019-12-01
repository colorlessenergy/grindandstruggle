import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutAction } from '../../store/actions/authAction'

class NavBar extends Component {
  render() {
    // nav items if user is not logged in
    let NavItems = (
      <nav>
        <ul>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/">Grind and Struggle</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </ul>
      </nav>
    );
    // nav items if user is logged in
    if (this.props.isAuthenticated) {
      NavItems = (
        <nav>
          <ul>
            <li><NavLink to="/create">Create Post</NavLink></li>
            <li><NavLink to="/">Grind and Struggle</NavLink></li>
            <li onClick={this.logoutUser}>Logout</li>
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
    isAuthenticated: state.auth.token !== null
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