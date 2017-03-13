import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading your amazing content...</div>
    }
    return(
      <div>
        <Link to="/" className="btn btn-primary">Take me back home</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={ this.onDeleteClick.bind(this) } >
          Delete this post
        </button>
        <div>
          <h4>You are on post { this.props.params.id }</h4>
          <h3>{ post.title }</h3>
          <h6>Categories: { post.categories }</h6>
          <p>{ post.categories }</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
