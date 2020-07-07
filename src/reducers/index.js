
import { ADD_ARTICLE, DATA_LOADED } from "../constants/action-types";
import {constructWikiData, constructHackerNewsData} from '../utils/index'

const initialState = {
  articles: [],
  remoteArticles: []
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });
    case DATA_LOADED:
      // console.log(action.resource);
      state.remoteArticles = [];
      return Object.assign({}, state, {
        remoteArticles:state.remoteArticles.concat(
          action.resource !== 'wiki'?action.payload:constructWikiData(action.payload))
      });
    default:
      break;
  }

  return state;
}



export default rootReducer;