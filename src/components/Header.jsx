import React from 'react';
import { Layout, Icon, Avatar } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Media from 'react-media';

import DesktopMenu from './menu/DesktopMenu';
import MobileMenu from './menu/MobileMenu';

const { Header } = Layout;

const TheBlogHeader = (props) => {
  const pathName = props.location.pathname.match(/\/(\w+)/);
  const activeNav = !!pathName ? pathName[1] : 'home';

  if (props.isLogIn) {
    const avatar = !!props.user.image ? (
      <Avatar src={props.user.image} />
    ) : (
      <Avatar size={35} icon="user" />
    );

    return (
      <Header className="header">
        <div className="wrapper">
          <Link to={`/profile/@${props.user.username}`} className="avatar">
            {avatar}
          </Link>
          <Media query="(max-width: 767px)">
            {(matches) =>
              matches ? (
                <MobileMenu isLogIn={props.isLogIn} />
              ) : (
                <DesktopMenu isLogIn={props.isLogIn} activeNav={activeNav} />
              )
            }
          </Media>
        </div>
      </Header>
    );
  }

  return (
    <Header className="header">
      <div className="wrapper">
        <div className="logo">
          <Icon type="github" />
        </div>
        <Media query="(max-width: 767px)">
          {(matches) => (matches ? <MobileMenu /> : <DesktopMenu activeNav={activeNav} />)}
        </Media>
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => {
  const { isLogIn, user } = state.authentication;
  return {
    isLogIn,
    user
  };
};

export default withRouter(connect(mapStateToProps, null)(TheBlogHeader));
