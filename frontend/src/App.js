import React from 'react';

import Layout from './hoc/Layout';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './container/Register/Register';
import Login from './container/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
