import React from 'react';

function Layout (props) {
  return (
    <React.Fragment>
      <h1>grind and struggle</h1>
      {props.children}
      <p>Copyright c 2019 Brian;</p>
    </React.Fragment>
  )
}

export default Layout;