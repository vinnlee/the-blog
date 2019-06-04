import { combineReducers } from "redux";
import articlelist from "./articles";
import authentication from "./authentication";

export default combineReducers({
  articlelist,
  authentication
});
