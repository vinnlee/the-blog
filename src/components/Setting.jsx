import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { connect } from "react-redux";

class SettingForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    console.log(this.props.user, "props");
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 }, // Extra small devices (<768px)
        sm: { span: 4 } // Small devices (≥768px)
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 20 }
      }
    };
    const buttonLayout = {
      wrapperCol: {
        xs: { offset: 0 },
        sm: { offset: 4 }
      }
    };
    const { user } = this.props;
    if (!user) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      );
    }
    return (
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        labelAlign="left"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <h1 className="form-title">Setting</h1>
        <Form.Item label="Email:">
          {getFieldDecorator("email", {
            initialValue: user.email,
            rules: [
              {
                type: "email",
                message: "Please enter a valid email address!"
              },
              {
                required: true,
                message: "Please input your email!"
              }
            ]
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item label="Username:">
          {getFieldDecorator("userName", {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: "Please input your username!"
              }
            ]
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item label="Avatar: ">
          <Input
            placeholder="Place your avatar URL here."
            defaultValue={user.image}
          />
        </Form.Item>
        <Form.Item label="Biography: ">
          <Input.TextArea
            rows={6}
            placeholder="Write a short paragraph to describe yourself."
            defaultValue={user.bio}
          />
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const TheBlogSetting = Form.create({ name: "setting_form" })(SettingForm);

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  };
};

export default connect(
  mapStateToProps,
  null
)(TheBlogSetting);
