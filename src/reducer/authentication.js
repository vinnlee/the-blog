import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_INVALID,
  LOGOUT
} from "../actionType";

const authentication = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      const { user } = action.payload;
      return {
        ...state,
        isLogIn: true,
        user
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
    default:
      return state;
  }
};

export default authentication;
