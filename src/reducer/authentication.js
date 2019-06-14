import {
  REGISTER,
  LOGIN,
  LOGOUT,
  UPDATE_SETTING,
  FETCH_USERINFO,
  AUTH_ERROR
} from "../actionType";

const authentication = (state = {}, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case FETCH_USERINFO:
      return {
        ...state,
        isLogIn: true,
        user: action.payload.user
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLogIn: false,
        error: action.payload
      };
    case LOGOUT:
      return {};
    case UPDATE_SETTING:
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

export default authentication;
