import {
  LOAD_ARTICLES,
  LOAD_SINGLE_ARTICLE,
  UNLOAD,
  FETCH_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT
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
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [state.comments].filter(
          comment => comment.id !== action.payload.id
        )
      };
    default:
      return state;
  }
};

export default articlelist;
