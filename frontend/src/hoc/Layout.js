import React from 'react';
import Navbar from '../components/Navbar/Navbar';

function Layout (props) {
  return (
    <React.Fragment>
      <h1>grind and struggle</h1>
      <Navbar />
      {props.children}
      <p>Copyright c 2019 Brian;</p>
    </React.Fragment>
  )
}

export default Layout;