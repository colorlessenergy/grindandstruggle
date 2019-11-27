import React, {Component} from 'react';

import { getSinglePost } from '../../store/actions/postAction';

import {createCommentAction} from '../../store/actions/commentAction';
import { connect } from 'react-redux';

import { formatDate } from '../../helpers/';

import { Link } from 'react-router-dom';

class Post extends Component {
  componentDidMount = () => {
    this.props.getSinglePost(this.props.match.params.id);
  }
  
  render () {
    const { post } = this.props;
    let commentsElements = (null);

    if (post && post.comments) {
      commentsElements = post.comments.map((comment, index) => {
        console.log(comment)
        let commentDate = formatDate(comment.createdAt)
        let replies = comment.replies.map((reply, index) => {
          let replyDate = formatDate(reply.createdAt);

          return (
            <div key={index}>
              <p>
                {reply.creatorName} - {replyDate}
              </p>

              <p>
                {reply.reply}
              </p>
            </div>
          )
        });

        return (
          <div key={index}>
            <div>
              <p>
                {comment.creatorUsername} - {commentDate}
              </p>

              <p>
                {comment.comment}
              </p>
            </div>
            <div>
              {replies}
            </div>
          </div>
        )
      })
    }

    let displayPost = (null);

    if (post) {
      let postDate = formatDate(post.createdAt)

      displayPost = (
        <div>
          <div>
            <p>
              {postDate} - {post.creatorName}
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

    let allowToCreateComment = localStorage.token ? (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="comment"></label>
          <input
            type="text"
            id="comment"
            name="comment"
            onChange={this.handleChange} />
        </div>
        <div>
          <button>
            create
            </button>
        </div>
      </form>
    ) : (
      <div>
        <p>
          <Link to='/login'>
            login
          </Link> or   
           <Link to='/register'>
             register
            </Link> to create a comment
        </p>
      </div>
    )

    return (
      <div>
        { displayPost }
        { allowToCreateComment }
        { commentsElements }
      </div>
    )
  }

  handleChange = (ev) => {
    this.setState({
      comment: ev.target.value
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let formatData = {
      comment: this.state.comment
    };

    this.props.createComment(formatData, this.props.match.params.id)
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
    },

    createComment: (comment, id) => {
      dispatch(createCommentAction(comment, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);