import { combineReducers } from 'redux';
import articlelist from './articles';
import authentication from './authentication';
import profile from './profile';

export default combineReducers({
  articlelist,
  authentication,
  profile
});
