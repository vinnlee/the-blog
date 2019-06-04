import React from "react";
import { Comment, Avatar } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { getCommentList, postComment } from "../../action";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // submitting: false,
      body: ""
    };

    this.props.commentList(this.props.slug);
  }

  handleSubmit = () => {
    if (!this.state.body) {
      return;
    }

    this.setState({
      // submitting: true,
      body: ""
    });

    this.props.postComment(this.props.slug, {
      comment: { body: this.state.body }
    });
  };

  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  render() {
    const comments = !!this.props.comments ? this.props.comments : [];
    if (!this.props.isLogIn) {
      return (
        <div className="comment">
          <div className="comment-list">
            <p className="no-comment">
              Please <Link to="/login">log in</Link> or{" "}
              <Link to="/register">register</Link> to add comments.
            </p>
            {comments.length > 0 && <CommentList comments={comments} />}
          </div>
        </div>
      );
    }
    const { /*submitting,*/ body } = this.state;
    const userAvatar = !!this.props.user.image ? (
      <Avatar src={this.props.user.image} alt={this.props.user.username} />
    ) : (
      <Avatar size="large" icon="user" />
    );
    return (
      <div className="comment">
        <div className="comment-list">
          {comments.length === 0 && (
            <p className="no-comment">
              Be the first one who comments to this article.
            </p>
          )}
          {comments.length > 0 && <CommentList comments={comments} />}
        </div>
        <div className="comment-form">
          <h2 className="comment-form__title">Leave a comment</h2>
          <Comment
            avatar={userAvatar}
            content={
              <CommentForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                // submitting={submitting}
                value={body}
              />
            }
          />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  ...state.authentication,
  comments: state.articlelist.comments
});

const mapDispatchToProps = dispacth => {
  return {
    commentList: slug => dispacth(getCommentList(slug)),
    postComment: (slug, comment) => dispacth(postComment(slug, comment))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CommentBox);
