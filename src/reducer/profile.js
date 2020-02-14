import { FETCH_USERPROFILE, UNLOAD } from '../actionType';

const profile = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERPROFILE:
      return {
        ...state,
        ...action.payload[0].profile
      };
    case UNLOAD:
      return {};
    default:
      return state;
  }
};

export default profile;
