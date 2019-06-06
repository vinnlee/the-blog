import React from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import marked from "marked";
import { setArticles, unloadComponent } from "../action";
import CommentBox from "./comment";
import IconText from "./IconText";

class TheBlogArticle extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.props.loadArticle(true, params.slug);
  }

  componentWillUnmount() {
    this.props.unloadArticle();
  }

  render() {
    const { article } = this.props;
    if (!article) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      );
    }
    const md = { __html: marked(article.body, { sanitize: true }) };
    return (
      <div className="wrap">
        <h2 className="post-title">{article.title}</h2>
        <div className="post-meta">
          <IconText type="user" text={article.author.username} />
          <IconText
            type="calendar"
            text={new Date(article.updatedAt).toLocaleDateString()}
          />
          <IconText type="star-o" text={article.favoritesCount} />
          <IconText
            type="tags"
            text={!!article.tagList.length ? article.tagList : "Uncategorized"}
          />
        </div>
        <div className="post-content" dangerouslySetInnerHTML={md} />
        <CommentBox slug={this.props.match.params.slug} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.articlelist.article
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadArticle: (single, slug) => dispatch(setArticles(single, slug)),
    unloadArticle: () => dispatch(unloadComponent())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheBlogArticle);
