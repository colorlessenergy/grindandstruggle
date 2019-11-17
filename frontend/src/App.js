import React from 'react';

import Layout from './hoc/Layout';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './container/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/register' component={Register} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
