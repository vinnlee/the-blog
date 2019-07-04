import React from "react";
import { Avatar, Typography, Divider, List, Spin } from "antd";
import IconText from "./IconText";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { dispatchRequest, dispatchAction } from "../action";
import api from "../api";
import { FETCH_USERPROFILE, UNLOAD } from "../actionType";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.props.dispatchRequest({
      type: FETCH_USERPROFILE,
      getData: Promise.all([
        api.Profile.get(params.username),
        api.Articles.byAuthor(params.username)
      ])
    });
  }

  componentWillUnmount() {
    this.props.dispatchAction({
      type: UNLOAD
    });
  }

  render() {
    const { articles, profile } = this.props;
    if (!articles && Object.entries(profile).length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      );
    }
    return (
      <div className="wrap">
        <div className="profile">
          <div className="profile-avatar">
            <Avatar size={84} src={profile.image} />
          </div>
          <div className="profile-body">
            <Typography.Title level={3} className="profile-username">
              {profile.username}
            </Typography.Title>
            <Typography.Paragraph className="profile-bio">
              {profile.bio}
            </Typography.Paragraph>
          </div>
        </div>
        <Divider orientation="left" className="divide-line">
          {profile.username}'s article
        </Divider>
        <List
          className="article-list"
          itemLayout="vertical"
          dataSource={articles}
          pagination={{ pageSize: 15 }}
          renderItem={article => (
            <List.Item
              key={article.title}
              actions={[
                <IconText
                  type="calendar"
                  text={new Date(article.updatedAt).toLocaleDateString()}
                />,
                <IconText type="star-o" text={article.favoritesCount} />,
                <IconText
                  type="tags"
                  text={
                    !!article.tagList.length ? article.tagList : "Uncategorized"
                  }
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={article.author.image} size="large" />}
                description={
                  <React.Fragment>
                    by{" "}
                    <Link to={`/profile/@${article.author.username}`}>
                      {article.author.username}
                    </Link>
                  </React.Fragment>
                }
                title={
                  <Link to={`/article/${article.slug}`}>{article.title}</Link>
                }
              />
              {article.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articlelist.articles,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { dispatchRequest, dispatchAction }
)(UserProfile);
