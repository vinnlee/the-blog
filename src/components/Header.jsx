import React from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { Header } = Layout;

const TheBlogHeader = props => {
  const pathName = props.location.pathname.match(/\/(\w+)/);
  const activeNav = !!pathName ? pathName[1] : "home";

  if (props.isLogIn) {
    const avatar = props.user.image ? (
      <Avatar src={props.user.image} />
    ) : (
      <Avatar size={35} icon="user" />
    );
    return (
      <Header>
        <div className="avatar">{avatar}</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeNav]}
          style={{ lineHeight: "64px", float: "right" }}
        >
          <Menu.Item key="setting">
            <Link to="/setting">Setting</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">Log out</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
  return (
    <Header>
      <div className="logo">
        <Icon type="github" />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[activeNav]}
        style={{ lineHeight: "64px", float: "right" }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Sign up</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const mapStateToProps = state => {
  const { isLogIn, user } = state.authentication;
  return {
    isLogIn,
    user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(TheBlogHeader)
);
