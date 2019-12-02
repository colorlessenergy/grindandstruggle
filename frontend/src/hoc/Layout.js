import React from 'react';
import Navbar from '../components/Navbar/Navbar';

function Layout (props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
      <p>Copyright c 2019 Brian;</p>
    </React.Fragment>
  )
}

export default Layout;