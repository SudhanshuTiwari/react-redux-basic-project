import { ADD_ARTICLE, DATA_LOADED } from "../constants/action-types";
import {constructHackerNewsData, updateSubmissionCount} from '../utils/index'
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}


export function getuserData(searchText, resource) {
  console.log('resource Type : ', resource);
let requestUrl = getUrlByResource(searchText, resource);

  return function(dispatch) {
    return fetch(requestUrl)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED , payload: json });
      });
  };
}


export function getData(searchText, resource) {
  console.log('resource Type : ', resource);
let requestUrl = getUrlByResource(searchText, resource);
  return function(dispatch) {
    return fetch(requestUrl)
      .then(response =>{ console.log(response);
        return response.json()})
      .then(json => {
        if(resource === 'wiki'){
          dispatch({ type: DATA_LOADED , payload: json, resource});
        }else{
            let userUrls = constructHackerNewsData(json)
           // loadUsersData(searchedUserData, resource);
           let userRequests = [];
            userUrls.forEach(userurl => userRequests.push(getRecurciveData(userurl.userUrl)) );
          //  console.log(userUrls);
            Promise.all(userRequests)
            .then((allUserData)=>{ 
              dispatch({ type: DATA_LOADED , payload:updateSubmissionCount(userUrls, allUserData), resource});
            })
        }
      });
  };
}

export function getRecurciveData(url) {
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then((response)=>response.json())
    .then(data => resolve(data))
    });
}

function getUrlByResource(query, resourceType){
  let url = '';
  switch (resourceType) {
      case 'hackernews':
          url = "http://hn.algolia.com/api/v1/search?query=" + query;
          break;
      case 'wiki':
          url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=halodoc&origin=*";
          break;
      default:
          break;
  }
  return url;
};
