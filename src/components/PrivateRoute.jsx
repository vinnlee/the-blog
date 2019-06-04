import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "../helper/localStorage";

const PrivateRoute = ({ component: Component, isLogIn, ...rest }) => {
  const token = getToken();
  return (
    <Route
      {...rest}
      render={props =>
        !!token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isLogIn: state.authentication.isLogIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);
