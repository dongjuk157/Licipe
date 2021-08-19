import { createAction, handleActions } from "redux-actions";
import { Map, List } from 'immutable';
import { pender } from "redux-pender";
import * as ArticleAPI from '../../lib/api/article';
import * as _ from 'loadsh';

// action types
const CHANGE_INPUT = 'article/CHANGE_INPUT';
const INITIALIZE_FORM = 'article/INITIALIZE_FORM';
const UPLOAD_ARTICLE = 'article/UPLOAD_ARTICLE';
const UPLOAD_IMAGE = 'article/UPLOAD_IMAGE';
const GET_ARTICLE = 'article/GET_ARTICLE';
const EDIT_ARTICLE = 'article/EDIT_ARTICLE';
const DELETE_ARTICLE = 'article/DELETE_ARTICLE';
const UPLOAD_S3 = 'article/UPLOAD_S3';
const UPDATE_FEED = 'article/UPDATE_FEED';
const GET_ARTICLES_PAGE = 'article/GET_ARTICLE_PAGE';


// action creators
export const changeInput = createAction(CHANGE_INPUT); // {name(key), value}
export const initializeForm = createAction(INITIALIZE_FORM);
export const uploadArticle = createAction(UPLOAD_ARTICLE, ArticleAPI.uploadArticle); // { content, imgURL, food, member  }
export const uploadImage = createAction(UPLOAD_IMAGE, ArticleAPI.uploadImage); // { userid, img } : formData
export const getArticle = createAction(GET_ARTICLE, ArticleAPI.getArticle); // { articleid }
export const editArticle = createAction(EDIT_ARTICLE, ArticleAPI.editArticle); // { content, imgURL, food, member, articleid }
export const deleteArticle = createAction(DELETE_ARTICLE, ArticleAPI.deleteArticle); // { articleid }
export const uploadS3 = createAction(UPLOAD_S3, ArticleAPI.uploadS3); // { userid, file }: formdata
export const updateFeed = createAction(UPDATE_FEED, ArticleAPI.updateFeed); // {page?}
export const getArticlesPage = createAction(GET_ARTICLES_PAGE, ArticleAPI.getArticlesPage); // { articleid }

// initiate states
const initialState = Map({
  article: Map({
    data: Map({
      userid: '',
      food: '',
      content: '',
      imgURL: '',
      articleid: null,
    }),
  }),
  postSuccess: false,
  result: Map({}),
  articles: List([]),
});


// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['article', 'data', name], value);
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState.get(action.payload);
    return state.set(action.payload, initialForm);
  },
  ...pender({
    type: UPLOAD_ARTICLE,
    onSuccess: (state, action) => {
      return state.set(['postSuccess'], true);
    },
  }),
  ...pender({
    type: EDIT_ARTICLE,
    onSuccess: (state, action) => {
      return state.set(['postSuccess'], true);
    },
  }),
  ...pender({
    type: UPLOAD_IMAGE,
    onSuccess: (state, action) => {
      const { imgURL } = action.payload;
      return state.setIn(['article','data', 'imgURL'], imgURL);
    },
  }),  
  ...pender({
    type: GET_ARTICLE,
    onSuccess: (state, action) => {
      // console.log(action.payload.data)
      const {member, food, content, id, imgURL} = action.payload.data
      //userid, food, content, imgURL, articleid,
      return state
      .setIn(['article','data','userid'], member)
      .setIn(['article','data','food'], food)
      .setIn(['article','data','content'], content)
      .setIn(['article','data','imgURL'], imgURL)
      .setIn(['article','data','articleid'], id)
    },
    onFailure: (state, action) => initialState
  }),
  ...pender({
    type: GET_ARTICLES_PAGE,
    onSuccess: (state, action) => {
      // console.log(action.payload.data)
      const feeds = state.get('articles');
      const intersectionFeeds = _.intersectionBy(feeds, action.payload.data,'id');
      const newFeeds = _.unionBy([...intersectionFeeds, ...action.payload.data], 'id');
      // console.log(newFeeds)
      return state
      .set('articles', newFeeds)
    },
    onFailure: (state, action) => initialState
  }),
  ...pender({
    type: UPLOAD_S3,
    onSuccess: (state, action) => {
      const { Location } = action.payload;
      return state.setIn(['article','data', 'imgURL'], Location);
    },
    onFailure: (state, action) => {
      console.log("error");
    }
  }),  
  
}, initialState);