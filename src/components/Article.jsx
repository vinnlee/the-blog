import React from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import Showdown from "showdown";
import api from "../api";
import { dispatchRequest, dispatchAction } from "../action";
import { FETCH_ARTICLE, UNLOAD, DELETE_ARTICLE } from "../actionType";
import { Link } from "react-router-dom";
import history from "../helper/history";
import CommentBox from "./comment";
import IconText from "./IconText";

class TheBlogArticle extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatchRequest({
      type: FETCH_ARTICLE,
      getData: api.Articles.get(this.props.match.params.slug)
    });

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      simpleLineBreaks: true
    });
  }

  handleDelete = () => {
    this.props.dispatchRequest({
      type: DELETE_ARTICLE,
      getData: api.Articles.delete(this.props.match.params.slug)
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.redirect !== prevProps.redirect) {
      if (this.props.redirect) {
        history.push(`/profile/@${this.props.currentUser.username}`);
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatchAction({
      type: UNLOAD
    });
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
          <IconText
            type="star-o"
            theme="filled"
            text={article.favoritesCount}
          />
          <IconText
            type="tags"
            theme="filled"
            text={!!article.tagList.length ? article.tagList : "Uncategorized"}
          />
          {this.props.currentUser &&
            this.props.currentUser.username === article.author.username && (
              <React.Fragment>
                <Link to={`/post/edit/${article.slug}`}>
                  <IconText
                    type="edit"
                    text="Edit"
                    tooltip={true}
                    title="Edit this article."
                  />
                </Link>
                <span onClick={this.handleDelete}>
                  <IconText
                    type="delete"
                    text="Delete"
                    tooltip={true}
                    title="Delete this article."
                  />
                </span>
              </React.Fragment>
            )}
        </div>
        <div className="post-content" dangerouslySetInnerHTML={md} />
        <CommentBox slug={this.props.match.params.slug} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articlelist.article,
  currentUser: state.authentication.user,
  redirect: state.articlelist.redirect
});

export default connect(
  mapStateToProps,
  { dispatchRequest, dispatchAction }
)(TheBlogArticle);
