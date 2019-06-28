import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import TheBlogArticleList from "../components/ArticleList";
import TheBlogLogin from "../components/Login";
import TheBlogSignup from "../components/Register";
import TheBlogArticle from "../components/Article";
import TheBlogSetting from "../components/Setting";
import NewPost from "../components/NewPost";
import UserProfile from "../components/Profile";
import PrivateRoute from "./PrivateRoute";

const { Content } = Layout;

const TheBLogContent = () => {
  return (
    <Content className="content">
      <div style={{ paddingBottom: 70 }} className="wrapper">
        <Switch>
          <Route exact path="/" component={TheBlogArticleList} />
          <Route path="/login" component={TheBlogLogin} />
          <Route path="/register" component={TheBlogSignup} />
          <Route path="/articles/:slug" component={TheBlogArticle} />
          <Route path="/@:username" component={UserProfile} />
          <PrivateRoute path="/setting" component={TheBlogSetting} />
          <PrivateRoute path="/newpost" component={NewPost} />
        </Switch>
      </div>
    </Content>
  );
};

export default TheBLogContent;
