import api from "./api";
import history from "./helper/history";
import { saveToken, removeToken } from "./helper/localStorage";

import {
  LOAD_ARTICLES,
  LOGIN_SUCCESS,
  LOGIN_INVALID,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_SINGLE_ARTICLE,
  LOGOUT,
  UNLOAD
} from "./actionType";

export const setArticles = (single = false, slug = "") => {
  return dispatch => {
    if (!single) {
      return api.Articles.all().then(data => {
        dispatch({
          type: LOAD_ARTICLES,
          payload: data
        });
      });
    } else {
      return api.Articles.get(slug).then(data => {
        dispatch({
          type: LOAD_SINGLE_ARTICLE,
          payload: data
        });
      });
    }
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    return api.Auth.login(email, password)
      .then(data => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data
        });
        saveToken(data.user.token);
        history.push("/setting");
      })
      .catch(error => {
        dispatch({
          type: LOGIN_INVALID,
          payload: error.response.data.errors
        });
      });
  };
};

export const logoutUser = () => {
  removeToken();
  return { type: LOGOUT };
};

export const registerUser = ({ username, email, password }) => {
  return dispatch => {
    return api.Auth.register(username, email, password)
      .then(data => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data
        });
        saveToken(data.user.token);
        history.push("/setting");
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.errors
        });
      });
  };
};

export const fetchUser = () => {
  return dispatch => {
    return api.Auth.currentUser()
      .then(data => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_INVALID,
          payload: error.response.data.errors
        });
      });
  };
};

export const unloadComponent = () => {
  return { type: UNLOAD };
};
