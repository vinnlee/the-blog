import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const DesktopMenu = (props) => {
  if (props.isLogIn) {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[props.activeNav]}
        selectedKeys={[props.activeNav]}
        className="desktop-menu"
      >
        <Menu.Item key="home">
          <Link to="/">
            <Icon type="home" theme="filled" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="newpost">
          <Link to="/post/new">
            <Icon type="form" />
            New post
          </Link>
        </Menu.Item>
        <Menu.Item key="setting">
          <Link to="/user/setting">
            <Icon type="setting" theme="filled" />
            Setting
          </Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">
            <Icon type="logout" />
            Log Out
          </Link>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[props.activeNav]}
      selectedKeys={[props.activeNav]}
      className="desktop-menu"
    >
      <Menu.Item key="home">
        <Link to="/">
          <Icon type="home" theme="filled" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">
          <Icon type="login" />
          Log In
        </Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">
          <Icon type="user-add" />
          Sign Up
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default DesktopMenu;
