import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  UNLOAD,
  FETCH_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT,
  POST_ARTICLE,
  SUBMIT_COMMENT,
  SUBMIT_ARTICLE,
  FETCH_USERPROFILE
} from "../actionType";

const articlelist = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      const { articles, articlesCount } = action.payload;
      return {
        ...state,
        articles,
        articlesCount
      };
    case FETCH_USERPROFILE:
      return {
        ...state,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount
      }
    case FETCH_ARTICLE:
    case POST_ARTICLE:
      const { article } = action.payload;
      return {
        ...state,
        article,
        submitting: false
      };
    case UNLOAD:
      return {};
    case FETCH_COMMENT:
      return {
        ...state,
        comments: action.payload.comments
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
        submitting: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [...state.comments].filter(
          comment => comment.id !== action.payload.commentId
        )
      };
    case SUBMIT_COMMENT:
    case SUBMIT_ARTICLE:
      return {
        ...state,
        submitting: true
      };
    default:
      return state;
  }
};

export default articlelist;
