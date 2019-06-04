import React from "react";
import { Layout } from "antd";
import { Router } from "react-router-dom";
import { connect } from "react-redux";

import TheBlogHeader from "./Header";
import TheBlogFooter from "./Footer";
import TheBlogContent from "./Content";
import history from "../helper/history";
import { fetchUser } from "../action";
import { getToken } from "../helper/localStorage";

import "antd/dist/antd.css";
import "../styles.scss";

class App extends React.Component {
  componentDidMount() {
    if (!!getToken()) {
      this.props.fetchUser();
    }
  }

  render() {
    return (
      <Router history={history}>
        <Layout className="layout">
          <TheBlogHeader />
          <TheBlogContent />
          <TheBlogFooter />
        </Layout>
      </Router>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
