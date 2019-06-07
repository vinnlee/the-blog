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
  FETCH_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT,
  UNLOAD,
  UPDATE_SETTING
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

export const getCommentList = slug => {
  return dispatch => {
    return api.Comments.get(slug).then(data => {
      dispatch({
        type: FETCH_COMMENT,
        payload: data
      });
    });
  };
};

export const postComment = (slug, comment) => {
  return dispatch => {
    return api.Comments.post(slug, comment).then(data => {
      dispatch({
        type: POST_COMMENT,
        payload: data
      });
    });
  };
};

export const deleteComment = (slug, id) => {
  return dispatch => {
    return api.Comments.delete(slug, id).then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: id
      });
    });
  };
};

export const updateSetting = user => {
  return dispatch => {
    return api.Auth.updateSetting(user).then(data => {
      dispatch({
        type: UPDATE_SETTING,
        payload: data
      });
    });
  };
};

export const unloadComponent = () => {
  return { type: UNLOAD };
};
