import React, { Component } from 'react';
import {connect} from 'react-redux';

import Layout from './hoc/Layout';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Register from './container/Register/Register';
import Login from './container/Login/Login';

import Post from './container/Post/Post';
import CreatePost from './container/CreatePost/CreatePost';
import Home from './container/Home/Home';
import { authCheckState } from './store/actions/authAction';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
      let routes = (
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/post/:id' component={Post} />
          <Redirect to='' />
        </Switch>
      );
      if (this.props.isAuthenticated) {
        routes = (
          <Switch>
            <Route exact path='/create' component={CreatePost} />
            <Route exact path='/' component={Home} />
            <Route exact path='/post/:id' component={Post} />
            <Redirect to='/' />
          </Switch>
        );
      }
      return (
        <HashRouter>
          <Layout>
            {routes}
          </Layout>
        </HashRouter>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => {
      return dispatch(authCheckState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
