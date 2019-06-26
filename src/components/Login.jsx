import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ErrorList from "./ErrorList";
import api from "../api";
import { dispatchRequest, dispatchAction } from "../action";
import { LOGIN, LOGOUT } from "../actionType";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatchAction(LOGOUT);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.props.dispatchRequest(
          LOGIN,
          api.Auth.login(user.email, user.password)
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="the-form">
        <h1 className="form-title">Login</h1>
        {!!this.props.invalid && <ErrorList items={this.props.invalid} />}
        <Form.Item>
          {getFieldDecorator("email", {
            validateTrigger: ["onSubmit"],
            rules: [
              {
                type: "email",
                message: "Please enter a valid email address!"
              },
              { required: true, message: "Please enter your email!" }
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
            rules: [{ required: true, message: "Please enter your password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="the-form__button">
            Log in
          </Button>
          Or <Link to="/register">register</Link> if you don't have an account.
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

export default connect(
  mapStateToProps,
  { dispatchRequest, dispatchAction }
)(TheBlogLogin);
