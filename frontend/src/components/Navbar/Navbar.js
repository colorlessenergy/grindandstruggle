import React from 'react';
import {NavLink} from 'react-router-dom';

const navbar = props => {
  // nav items if user is not logged in
  let navItems = (
      <nav>
        <ul>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/">Grind and Struggle</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </ul>
      </nav>
    );
  // nav items if user is logged in
  if (localStorage.token) {
    navItems = (
      <nav>
        <ul>
          <li><NavLink to="/create">Create Post</NavLink></li>
          <li><NavLink to="/">Grind and Struggle</NavLink></li>
          <li><NavLink to="/logout">Logout</NavLink></li>
        </ul>
      </nav>
    );
  }

  return navItems;
};

export default navbar;