import React from "react";
import { Form, Input, Tag, Icon, Button } from "antd";
import { connect } from "react-redux";
import ReactMde from "react-mde";
import Showdown from "showdown";
import { dispatchRequest, dispatchAction } from "../action";
import api from "../api";
import {
  POST_ARTICLE,
  SUBMIT_ARTICLE,
  FETCH_ARTICLE,
  UNLOAD
} from "../actionType";
import alertSuccess from "./Alert";

import "react-mde/lib/styles/css/react-mde-all.css";

class PostEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      content: "",
      tab: "write",
      tags: [],
      showTagInput: false,
      tagValue: ""
    };

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
      simpleLineBreaks: true
    });

    if (this.props.match.params.slug) {
      this.props.dispatchRequest({
        type: FETCH_ARTICLE,
        getData: api.Articles.get(this.props.match.params.slug)
      });
    }
  }

  handleChange = content => {
    this.setState({ content });
  };

  handleTabChange = tab => {
    this.setState({ tab });
  };

  handleTagInputChange = e => {
    this.setState({ tagValue: e.target.value });
  };

  handleTagInput = () => {
    const { tagValue } = this.state;
    let { tags } = this.state;
    if (tagValue && tags.indexOf(tagValue) === -1) {
      tags = [...tags, tagValue];
    }
    this.setState({
      tags,
      showTagInput: false,
      tagValue: ""
    });
  };

  handleShowTagInput = () => {
    this.setState({ showTagInput: true }, () => this.input.focus());
  };

  handleTagClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  saveTagInputRef = input => (this.input = input);

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fields) => {
      if (!err) {
        const tagList = this.state.tags;
        const formField = tagList.length > 0 ? { ...fields, tagList } : fields;
        const action = this.props.match.params.slug
          ? api.Articles.update(this.props.match.params.slug, {
              article: formField
            })
          : api.Articles.post({ article: formField });
        this.props.dispatchRequest({
          type: POST_ARTICLE,
          subType: SUBMIT_ARTICLE,
          getData: action
        });
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.submitting !== prevProps.submitting) {
      if (!this.props.submitting) {
        alertSuccess("Posted", "Your article has been posted successfully!");
      }
    }
    if (this.props.article !== prevProps.article) {
      if (this.props.match.params.slug && !!this.props.article) {
        this.props.form.setFieldsValue({
          title: this.props.article.title,
          description: this.props.article.description,
          body: this.props.article.body
        });
        this.setState({
          tags: this.props.article.tagList
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatchAction({
      type: UNLOAD
    });
  }

  render() {
    const tagList = this.state.tags.map(tag => {
      return (
        <span key={tag} style={{ display: "inline-block" }}>
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleTagClose(tag);
            }}
          >
            {tag}
          </Tag>
        </span>
      );
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="post-editor">
        <Form onSubmit={this.handleSubmit}>
          <h1 className="form-title">
            {this.props.match.params.slug ? "Edit Post" : "Add New Post"}
          </h1>
          <Form.Item className="post-editor__title">
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "Title should not be blank!" }]
            })(<Input placeholder="A meaningful title about your article." />)}
          </Form.Item>
          <Form.Item className="post-editor__description">
            {getFieldDecorator("description", {
              rules: [
                { required: true, message: "Description should not be blank!" }
              ]
            })(
              <Input.TextArea
                rows={4}
                placeholder="A short description about your article."
              />
            )}
          </Form.Item>
          <Form.Item className="Item">
            {getFieldDecorator("body", {
              rules: [{ required: true, message: null }]
            })(
              <ReactMde
                onChange={this.handleChange}
                onTabChange={this.handleTabChange}
                minEditorHeight={500}
                minPreviewHeight={500}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(this.converter.makeHtml(markdown))
                }
                selectedTab={this.state.tab}
              />
            )}
          </Form.Item>
          <Form.Item className="post-editor__tags">
            {tagList}
            {this.state.showTagInput && (
              <Input
                ref={this.saveTagInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={this.state.tagValue}
                onChange={this.handleTagInputChange}
                onBlur={this.handleTagInput}
                onPressEnter={this.handleTagInput}
              />
            )}
            {!this.state.showTagInput && (
              <Tag
                onClick={this.handleShowTagInput}
                style={{ background: "#fff", borderStyle: "dashed" }}
              >
                <Icon type="plus" /> New tag
              </Tag>
            )}
          </Form.Item>
          <Form.Item className="post-editor__submit">
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.submitting}
            >
              {this.props.match.params.slug ? "Edit" : "Publish"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const NewPost = Form.create({ name: "post_editor" })(PostEditor);

const mapStateToProps = state => ({
  article: state.articlelist.article,
  submitting: state.articlelist.submitting
});

export default connect(
  mapStateToProps,
  { dispatchRequest, dispatchAction }
)(NewPost);
