import React from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import Showdown from "showdown";
import api from "../api";
import { dispatchRequest, dispatchAction } from "../action";
import { FETCH_ARTICLE, UNLOAD } from "../actionType";
import CommentBox from "./comment";
import IconText from "./IconText";

class TheBlogArticle extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.props.dispatchRequest(FETCH_ARTICLE, api.Articles.get(params.slug));

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  componentWillUnmount() {
    this.props.dispatchAction(UNLOAD);
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
    const md = { __html: this.converter.makeHtml(article.body) };
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

export default connect(
  mapStateToProps,
  { dispatchRequest, dispatchAction }
)(TheBlogArticle);
