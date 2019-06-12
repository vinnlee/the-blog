import React from "react";
import { List, Avatar, Spin } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setArticles } from "../action";
import IconText from "./IconText";

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
        className="article-list"
        itemLayout="vertical"
        dataSource={articles}
        pagination={{
          // onChange: page => {
          //   console.log(page);
          // },
          pageSize: 15
        }}
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
                  <Link to={`/@${article.author.username}`}>
                    {article.author.username}
                  </Link>
                </React.Fragment>
              }
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
