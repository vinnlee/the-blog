import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import TheBlogArticleList from "../components/ArticleList";
import TheBlogLogin from "../components/Login";
import TheBlogSignup from "../components/Register";
import TheBlogArticle from "../components/Article";
import TheBlogSetting from "../components/Setting";
import PrivateRoute from "./PrivateRoute";

import "antd/dist/antd.css";

const { Content } = Layout;

const TheBLogContent = () => {
  return (
    <Content style={{ padding: 20 }}>
      <div style={{ padding: "24px 24px 70px" }}>
        <Switch>
          <Route exact path="/" component={TheBlogArticleList} />
          <Route path="/login" component={TheBlogLogin} />
          <Route path="/register" component={TheBlogSignup} />
          <Route path="/articles/:slug" component={TheBlogArticle} />
          <PrivateRoute path="/setting" component={TheBlogSetting} />
        </Switch>
      </div>
    </Content>
  );
};

export default TheBLogContent;
