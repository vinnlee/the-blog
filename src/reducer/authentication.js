import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_INVALID,
  LOGOUT,
  UPDATE_SETTING
} from "../actionType";

const authentication = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogIn: true,
        user: action.payload.user
      };
    case REGISTER_FAIL:
    case LOGIN_INVALID:
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
