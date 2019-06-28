import history from "./helper/history";
import { saveToken, removeToken } from "./helper/localStorage";

import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ERROR,
  AUTH_ERROR,
  FETCHING
} from "./actionType";

export function dispatchRequest({
  type,
  subType = FETCHING,
  getData,
  carrier = {}
} = {}) {
  return dispatch => {
    if (getData && typeof getData.then === "function") {
      dispatch({ type: subType });
      if (type === LOGIN || type === REGISTER) {
        return getData
          .then(data => {
            dispatch({
              type,
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
        return getData
          .then(data => {
            data =
              Object.entries(data).length === 0 &&
              data.constructor === Object &&
              (Object.entries(carrier).length !== 0 &&
                carrier.constructor === Object)
                ? carrier
                : data;
            dispatch({
              type,
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

export function dispatchAction(type) {
  if (type === LOGOUT) removeToken();
  return { type };
}
