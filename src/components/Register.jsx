import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import api from "../api";
import { dispatchRequest } from "../action";
import { REGISTER } from "../actionType";
import ErrorList from "./ErrorList";

class SignupForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.props.dispatchRequest(
          REGISTER,
          api.Auth.register(user.username, user.email, user.password)
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="the-form">
        <h1 className="form-title">Sign up</h1>
        {!!this.props.invalid && <ErrorList items={this.props.invalid} />}
        <Form.Item>
          {getFieldDecorator("email", {
            validateTrigger: ["onSubmit"],
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
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="the-form__button">
            Sign up
          </Button>
          Or <Link to="/login">log in</Link> if you already have an account.
        </Form.Item>
      </Form>
    );
  }
}

const TheBlogSignup = Form.create({ name: "signup_form" })(SignupForm);

const mapStateToProps = state => {
  return {
    invalid: state.authentication.error
  };
};

export default connect(
  mapStateToProps,
  { dispatchRequest }
)(TheBlogSignup);
