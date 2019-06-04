import React from "react";
import { List, Avatar, Icon, Spin } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setArticles } from "../action";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class TheBlogArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.props.setArticles();
  }

  render() {
    const articles = this.props.articles;
    if (!articles) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      );
    }
    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={articles}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10
        }}
        renderItem={article => (
          <List.Item
            key={article.title}
            actions={[<IconText type="star-o" text={article.favoritesCount} />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={article.author.image} />}
              title={
                <Link to={`/articles/${article.slug}`}>{article.title}</Link>
              }
            />
            {article.description}
          </List.Item>
        )}
      />
    );
  }
}

const mapStatetoProps = state => {
  return {
    articles: state.articlelist.articles
  };
};

export default connect(
  mapStatetoProps,
  { setArticles }
)(TheBlogArticleList);
