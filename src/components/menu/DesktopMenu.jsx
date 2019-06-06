import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const DesktopMenu = props => {
  if (props.isLogIn) {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={[activeNav]}
        selectedKeys={[]}
        className="desktop-menu"
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="setting">
          <Link to="/setting">Setting</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Log Out</Link>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      // defaultSelectedKeys={[activeNav]}
      selectedKeys={[]}
      className="desktop-menu"
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Log In</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Sign Up</Link>
      </Menu.Item>
    </Menu>
  );
};

export default DesktopMenu;
