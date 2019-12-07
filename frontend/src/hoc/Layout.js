import React from 'react';
import Navbar from '../components/Navbar/Navbar';

function Layout (props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  )
}

export default Layout;