import React, {Component} from 'react';

import { getSinglePost } from '../../store/actions/postAction';
import { connect } from 'react-redux';

class Post extends Component {
  componentDidMount = () => {
    this.props.getSinglePost(this.props.match.params.id);
  }
  render () {
    const { post } = this.props;

    let displayPost = (null);

    if (post) {
      let date = new Date(post.createdAt);
      let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      date = date.toLocaleDateString('en-US', dateOptions)

      displayPost = (
        <div>
          <div>
            <p>
              {date} - {post.creatorName}
            </p>
          </div>
          <h1>
            {post.title}
          </h1>
          <p>
            {post.content}
          </p>
        </div>
      )
    }

    return (
      <div>
        { displayPost }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.post
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => {
      dispatch(getSinglePost(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);