import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        //blog post has been created, navigate the user to home:
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <h3>Create a new post:</h3>

          <div className={ `form-group ${ title.touched && title.invalid ? 'has-danger' : '' }`}>
            <label>title</label>
            <input type="text" className="form-control" { ...title } ></input>
            <div className="text-help">
              { title.touched ? title.error : '' }
            </div>
          </div>

          <div className={ `form-group ${ categories.touched && categories.invalid ? 'has-danger' : '' }`}>
            <label>Categories</label>
            <input type="text" className="form-control" { ...categories }></input>
            { categories.touched ? categories.error : '' }
          </div>

          <div className={ `form-group ${ content.touched && content.invalid ? 'has-danger' : '' }`}>
            <label>Content</label>
            <textarea className="form-control" { ...content }></textarea>
            { content.touched ? content.error : '' }
          </div>

          <div className="text-xs-right">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Please enter a title';
  }

  if(!values.categories) {
    errors.categories = 'Please enter some categories';
  }

  if(!values.content) {
    errors.content = 'Please don\'t leave the content empty, that\'s stupid...';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: [ 'title', 'categories', 'content' ],
  validate
}, null, { createPost })(PostsNew);
