import React from "react";
import { List, Comment, Avatar } from "antd";
// import { Link } from 'react-router-dom';

const CommentList = props => (
  <List
    dataSource={props.comments}
    header={
      <h2 className="comment-list__title">
        {props.comments.length}{" "}
        {props.comments.length > 1 ? "comments" : "comment"}
      </h2>
    }
    itemLayout="horizontal"
    renderItem={comment => (
      <Comment
        avatar={
          !!comment.author.image ? (
            <Avatar src={comment.author.image} alt="comment.author.username" />
          ) : (
            <Avatar size="large" icon="user" />
          )
        }
        author={comment.author.username}
        content={<p>{comment.body}</p>}
        datetime={new Date(comment.updatedAt).toLocaleDateString()}
      />
    )}
  />
);

export default CommentList;
