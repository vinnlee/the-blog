import {
  LOAD_ARTICLES,
  LOAD_SINGLE_ARTICLE,
  UNLOAD,
  FETCH_COMMENT,
  POST_COMMENT
} from "../actionType";

const articlelist = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      const { articles, articlesCount } = action.payload;
      return {
        ...state,
        articles,
        articlesCount
      };
    case LOAD_SINGLE_ARTICLE:
      const { article } = action.payload;
      return {
        ...state,
        article
      };
    case UNLOAD:
      return {};
    case FETCH_COMMENT:
      const { comments } = action.payload;
      return {
        ...state,
        comments
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: state.comments.concat([action.payload.comment])
      };
    default:
      return state;
  }
};

export default articlelist;
