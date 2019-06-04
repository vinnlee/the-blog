import React from "react";
import { Form, Icon, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ErrorList from "./ErrorList";

import { loginUser, logoutUser } from "../action";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.logout();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.props.submitForm(user);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="the-form">
        <Typography.Title
          level={2}
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          Login
        </Typography.Title>
        {!!this.props.invalid && <ErrorList items={this.props.invalid} />}
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Please enter a valid email address!"
              },
              { required: true, message: "Please input your email!" }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="the-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const TheBlogLogin = Form.create({ name: "login_form" })(LoginForm);

const mapStateToProps = state => {
  return {
    invalid: state.authentication.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitForm: user => dispatch(loginUser(user)),
    logout: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheBlogLogin);
