import history from "./helper/history";
import { saveToken, removeToken } from "./helper/localStorage";

import { LOGIN, REGISTER, LOGOUT, ERROR, AUTH_ERROR } from "./actionType";

export function dispatchRequest(actionType, api, extra = {}) {
  return dispatch => {
    if (api && typeof api.then === "function") {
      if (actionType === LOGIN || actionType === REGISTER) {
        return api
          .then(data => {
            dispatch({
              type: actionType,
              payload: data
            });
            saveToken(data.user.token);
            history.push("/setting");
          })
          .catch(error => {
            dispatch({
              type: AUTH_ERROR,
              payload: error.response.data.errors
            });
          });
      } else {
        return api
          .then(data => {
            data =
              Object.entries(data).length === 0 &&
              data.constructor === Object &&
              (Object.entries(extra).length !== 0 &&
                extra.constructor === Object)
                ? extra
                : data;
            dispatch({
              type: actionType,
              payload: data
            });
          })
          .catch(error => {
            dispatch({
              type: ERROR,
              payload: error.response.data.errors
            });
          });
      }
    }
  };
}

export function dispatchAction(actionType) {
  if (actionType === LOGOUT) removeToken();
  return { type: actionType };
}
