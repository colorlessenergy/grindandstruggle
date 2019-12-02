import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {getAllPosts} from '../../store/actions/postAction';
import classes from './Home.module.css';

import { formatDate } from '../../helpers/';


class Home extends Component {

  componentDidMount = () => {
    this.props.getAllPosts();
  }

  render () {
    let posts = null;

    if (this.props.posts) {
      posts = (this.props.posts.map((post, index) => {
        if (index === 0) {
          return (
            <Link className={classes['post-contain--latest']} to={'/post/' + post._id} key={index}>
              <div className={[classes['post'], classes['post--latest']].join(' ')}>
                <h3 className={classes['post__title']}>
                  {post.title}
                </h3>
                <p className={classes['post__meta']}>
                  {post.content}
                </p>

                <p className={classes['post__info']}>
                  {post.comments.length} comments posted by: { post.creatorName } { formatDate(post.createdAt) }
                </p>
              </div>
            </Link>
          )
        }

        return (
          <Link className={classes['post-contain']} to={'/post/' + post._id} key={index}>
            <div className={classes.post}>
              <h3 className={classes['post__title']}>
                {post.title}
              </h3>
              <p className={classes['post__meta']}>
                {post.content}
              </p>

              <p className={classes['post__info']}>
                {post.comments.length} comments posted by: {post.creatorName}
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
      <div className={classes['contain-posts']}>
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