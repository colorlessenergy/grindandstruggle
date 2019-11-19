import React, { Component } from 'react';

import {connect} from 'react-redux';

import { createPost } from '../../store/actions/postAction';

class CreatePost extends Component {
  state = {
    title: '',
    content: ''
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">
            title
          </label>

          <input 
            type="text" 
            id="title" 
            name="title"
            ref="title"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            autoComplete="off" />
        </div>

        <div>
          <label htmlFor="content">
            content
          </label>

          <textarea 
            rows="10" 
            cols="150"
            id="content"
            name="content"
            ref="content"
            onChange={this.handleChange}
            onFocus={this.handleFocus} >

          </textarea>
        </div>

        <div>
          <p>
            {this.state.error}
          </p>

          <p>
            {this.props.authError}
          </p>

          <button>
            create
          </button>
        </div>
      </form>
    )
  }

  handleFocus = (ev) => {
    ev.target.classList.remove('error');
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    let errorMessage = '';

    if (!this.state.title) {
      errorMessage = 'Missing Title';

      this.refs.title.classList.add('error');
    }

    if (!this.state.content) {
      errorMessage += 'Missing Content';

      this.refs.content.classList.add('error');
    }

    if (errorMessage) {
      return this.setState({
        error: errorMessage
      });
    }

    this.props.createPost(this.state, this.props.history);

    this.setState({
      error: ''
    });

  }
}

const mapStateToProps = (state) => {
  return {
    error: state.posts.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post, history) => {
      return dispatch(createPost(post, history));
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);