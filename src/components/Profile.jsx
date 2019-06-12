import React from "react";
import { Avatar, Typography } from "antd";
import { connect } from "react-redux";

const UserProfile = () => {
  return (
    <div className="wrap">
      <div className="profile">
        <div className="profile-avatar">
          <Avatar size={84} icon="user" />
        </div>
        <div className="profile-body">
          <Typography.Title level={3} className="profile-username">
            Lorem ipsum
          </Typography.Title>
          <Typography.Paragraph className="profile-bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            repellat?
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  null
)(UserProfile);
