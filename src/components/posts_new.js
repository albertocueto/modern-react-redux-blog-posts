import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.props.createPost) }>
          <h3>Create a new post:</h3>

          <div className="form-group">
            <label>title</label>
            <input type="text" className="form-control" { ...title }></input>
          </div>

          <div className="form-group">
            <label>Categories</label>
            <input type="text" className="form-control" { ...categories }></input>
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" { ...content }></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: [ 'title', 'categories', 'content' ]
}, null, { createPost })(PostsNew);
