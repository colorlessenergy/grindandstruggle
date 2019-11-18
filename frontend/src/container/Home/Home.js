import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {getAllPosts} from '../../store/actions/postAction';


class Home extends Component {

  componentDidMount = () => {
    this.props.getAllPosts();
  }

  render () {
    let posts = null;

    if (this.props.posts) {
      posts = (this.props.posts.map((post, index) => {
        return (
          <Link to={'/post/' + post._id} key={index}>
            <div>
              <h3>
                {post.title}
              </h3>
              <p>
                {post.content}
              </p>
            </div>
          </Link>
        )
      }));
    } else {
      posts = (
        <p>
          loading
        </p>
      )
    }
    return (
      <div>
        { posts }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: () => {
      return dispatch(getAllPosts());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);