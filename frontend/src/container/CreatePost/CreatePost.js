import React, { Component } from 'react';

import {connect} from 'react-redux';

import { createPost } from '../../store/actions/postAction';

// react quill for a new rich text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import classes from './CreatePost.module.css';

class CreatePost extends Component {
  state = {
    title: '',
    content: ''
  }

  render () {
    return (
      <form
        className={classes['form']} 
        onSubmit={this.handleSubmit}>

        <div className={classes['form-group']}>
          <label
            className={classes['form-group__label']} 
            htmlFor="title">
            title
          </label>

          <input 
            type="text" 
            className={classes['form-group__input']}
            placeholder="enter a title..."
            id="title" 
            name="title"
            ref="title"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            autoComplete="off" />
        </div>

        <div className={classes['form-group']}>
          <label
            className={classes['form-group__label']} 
            htmlFor="content">
            content
          </label>

          <ReactQuill
            id="content"
            name="content"
            ref="content"
            modules={this.modules}
            formats={this.formats}
            value={this.state.content}
            placeholder='write your thoughts :)'
            onChange={this.handleReactQuillChange}
             />
        </div>

        <div className={classes['button-contain']}>
          <button className={classes['button']}>
            create
          </button>
        </div>

        <div className={classes['error-message']}>
          <p>
            {this.state.error}
          </p>

          <p>
            {this.props.authError}
          </p>
        </div>
      </form>
    )
  }

  // react quill init
  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['code-block']
    ]
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block'
  ];

  handleFocus = (ev) => {
    ev.target.classList.remove('error');
  }

  handleReactQuillChange = (ev) => {
    return this.setState({
      content: ev
    })
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

      this.refs.content.editingArea.classList.add('error');
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