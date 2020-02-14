import React from 'react';
import { Comment, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import api from '../../api';
import { dispatchRequest } from '../../action';
import { FETCH_COMMENT, POST_COMMENT, DELETE_COMMENT, SUBMIT_COMMENT } from '../../actionType';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };

    this.props.dispatchRequest({
      type: FETCH_COMMENT,
      getData: api.Comments.get(this.props.slug)
    });
  }

  handleSubmit = () => {
    if (!this.state.body) {
      return;
    }

    this.props
      .dispatchRequest({
        type: POST_COMMENT,
        subType: SUBMIT_COMMENT,
        getData: api.Comments.post(this.props.slug, {
          comment: { body: this.state.body }
        })
      })
      .then(() => {
        this.setState({
          body: ''
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      body: e.target.value
    });
  };

  handleDelete = (slug, id) => {
    this.props.dispatchRequest({
      type: DELETE_COMMENT,
      getData: api.Comments.delete(slug, id),
      carrier: { commentId: id }
    });
  };

  render() {
    const comments = !!this.props.comments ? this.props.comments : [];
    if (!this.props.isLogIn) {
      return (
        <div className="comment">
          <div className="comment-list">
            <p className="no-comment">
              Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to add
              comments.
            </p>
            {comments.length > 0 && <CommentList comments={comments} />}
          </div>
        </div>
      );
    }
    const { body } = this.state;
    const userAvatar = !!this.props.user.image ? (
      <Avatar src={this.props.user.image} alt={this.props.user.username} />
    ) : (
      <Avatar size="large" icon="user" />
    );
    return (
      <div className="comment">
        <div className="comment-form">
          <h2 className="comment-form__title">Say something nice</h2>
          <Comment
            avatar={userAvatar}
            content={
              <CommentForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={this.props.submitting}
                value={body}
              />
            }
          />
        </div>
        <div className="comment-list">
          {comments.length === 0 && (
            <p className="no-comment">Be the first one who comments to this article.</p>
          )}
          {comments.length > 0 && (
            <CommentList
              currentUser={this.props.user}
              slug={this.props.slug}
              comments={comments}
              onDelete={this.handleDelete}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  ...state.authentication,
  comments: state.articlelist.comments,
  submitting: state.articlelist.submitting
});

export default connect(mapStatetoProps, { dispatchRequest })(CommentBox);
