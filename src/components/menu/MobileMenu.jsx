import React from "react";
import { Icon, Drawer } from "antd";
import { Link } from "react-router-dom";

class MobileMenu extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    if (this.props.isLogIn) {
      return (
        <div className="mobile-menu">
          <Icon type="menu" className="icon" onClick={this.showDrawer} />
          <Drawer
            title="Menu"
            placement="right"
            visible={this.state.visible}
            closable={false}
            onClose={this.onClose}
          >
            <Link to="/" className="mobile-menu__item">
              Home
            </Link>
            <Link to="/newpost" className="mobile-menu__item">
              New post
            </Link>
            <Link to="/setting" className="mobile-menu__item">
              Setting
            </Link>
            <Link to="/login" className="mobile-menu__item">
              Log Out
            </Link>
          </Drawer>
        </div>
      );
    }

    return (
      <div className="mobile-menu">
        <Icon type="menu" className="icon" onClick={this.showDrawer} />
        <Drawer
          title="Menu"
          placement="right"
          visible={this.state.visible}
          closable={false}
          onClose={this.onClose}
        >
          <Link to="/" className="mobile-menu__item">
            Home
          </Link>
          <Link to="/login" className="mobile-menu__item">
            Log In
          </Link>
          <Link to="/register" className="mobile-menu__item">
            Sign up
          </Link>
        </Drawer>
      </div>
    );
  }
}

export default MobileMenu;
