import React from "react";
import { List, Comment, Avatar, Tooltip, Icon } from "antd";
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
    renderItem={comment => {
      const showAction = props.currentUser &&
        props.currentUser.username === comment.author.username && [
          <span onClick={() => props.onDelete(props.slug, comment.id)}>
            <Tooltip title="Remove this comment.">
              <Icon type="delete" />
              <span style={{ paddingLeft: 5, cursor: "pointer" }}>Delete</span>
            </Tooltip>
          </span>
        ];
      return (
        <Comment
          avatar={
            !!comment.author.image ? (
              <Avatar
                src={comment.author.image}
                alt="comment.author.username"
              />
            ) : (
              <Avatar size="large" icon="user" />
            )
          }
          author={comment.author.username}
          content={comment.body}
          datetime={new Date(comment.updatedAt).toLocaleDateString()}
          actions={showAction}
        />
      );
    }}
  />
);

export default CommentList;
