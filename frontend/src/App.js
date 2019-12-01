import React from 'react';

import Layout from './hoc/Layout';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './container/Register/Register';
import Login from './container/Login/Login';

import Post from './container/Post/Post';
import CreatePost from './container/CreatePost/CreatePost';
import Home from './container/Home/Home';
import NavBar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/create' component={CreatePost} />
          <Route exact path='/post/:id' component={Post}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
