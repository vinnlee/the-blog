import { LOAD_ARTICLES, LOAD_SINGLE_ARTICLE, UNLOAD } from "../actionType";

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
    default:
      return state;
  }
};

export default articlelist;
