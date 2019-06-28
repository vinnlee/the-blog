import {
  REGISTER,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  FETCH_USERINFO,
  SUBMIT_USERINFO,
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
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
        updated: true
      };
    case SUBMIT_USERINFO:
      return {
        ...state,
        updated: false
      };
    default:
      return state;
  }
};

export default authentication;
