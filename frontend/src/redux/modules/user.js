import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';
import { pender } from 'redux-pender';
import * as UserAPI from '../../lib/api/user';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // 로그인 정보 설정
const INITIALIZE_FORM = 'user/INITIALIZE_FORM';
const SET_VALIDATED = 'user/SET_VALIDATED'; // validated 값 설정
const LOGOUT = 'user/LOGOUT'; // 로그아웃
const CHECK_STATUS = 'user/CHECK_STATUS'; // 현재 로그인상태 확인
const GET_USER_INFO = 'user/GET_USER_INFO'; // 유저 정보 받아오기 (사용 안함)
const GET_USER_RATINGS = 'user/GET_USER_RATINGS';
const GET_USER_ARTICLES = 'user/GET_USER_ARTICLES';
const GET_USER_CLIPS = 'user/GET_USER_CLIPS';
const GET_USER_RATINGS_RECENT = 'user/GET_USER_RATINGS_RECENT';
const GET_USER_CLIPS_RECENT = 'user/GET_USER_CLIPS_RECENT';
const GET_USER_ARTICLES_RECENT = 'user/GET_USER_ARTICLES_RECENT';

export const setLoggedInfo = createAction(SET_LOGGED_INFO); // loggedInfo
export const initializeForm = createAction(INITIALIZE_FORM);
export const setValidated = createAction(SET_VALIDATED); // validated
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);
export const getUserInfo = createAction(GET_USER_INFO, UserAPI.getUserInfo);
export const getUserRatings = createAction(GET_USER_RATINGS, UserAPI.getUserRatings);
export const getUserArticles = createAction(GET_USER_ARTICLES, UserAPI.getUserArticles);
export const getUserClips = createAction(GET_USER_CLIPS, UserAPI.getUserClips);
export const getUserRatingsRecent = createAction(GET_USER_RATINGS_RECENT, UserAPI.getUserRatingsRecent);
export const getUserClipsRecent = createAction(GET_USER_CLIPS_RECENT, UserAPI.getUserClipsRecent);
export const getUserArticlesRecent = createAction(GET_USER_ARTICLES_RECENT, UserAPI.getUserArticlesRecent);

const initialState = Map({
    loggedInfo: Map({ // 현재 로그인중인 유저의 정보
        accessToken: null,
        username: null,
        userid: null,
    }),
    logged: false, // 현재 로그인중인지 알려준다
    validated: false, // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
    result: List([]),
    articles: Map({
        clips: List([]),
        articles: List([]),
        ratings: List([])
    }),
});

export default handleActions({
    [SET_LOGGED_INFO]: (state, action) => state.set('loggedInfo', Map(action.payload)).set('logged', true),
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
      },
    [SET_VALIDATED]: (state, action) => state.set('validated', action.payload),
    ...pender({
        type: CHECK_STATUS,
        onSuccess: (state, action) => state.set('loggedInfo', Map(action.payload.data)).set('validated', true), 
        onFailure: (state, action) => initialState
    }),
    ...pender({
        type: GET_USER_INFO,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: GET_USER_RATINGS,
        onSuccess: (state, action) => state.setIn(['articles', 'ratings'], List(action.payload.data)),
        onFailure: (state, action) => state.setIn(['articles', 'ratings'], List([])),
    }),
    ...pender({
        type: GET_USER_ARTICLES,
        onSuccess: (state, action) => state.setIn(['articles', 'articles'], List(action.payload.data)),
        onFailure: (state, action) => state.setIn(['articles', 'articles'], List([])),
    }),
    ...pender({
        type: GET_USER_CLIPS,
        onSuccess: (state, action) => state.setIn(['articles', 'clips'], List(action.payload.data)),
        onFailure: (state, action) => state.setIn(['articles', 'clips'], List([])),
    }),
    ...pender({
        type: GET_USER_RATINGS_RECENT,
        onSuccess: (state, action) => state.setIn(['articles', 'ratings'], List(action.payload.data)),
        onFailure: (state, action) => state.setIn(['articles', 'ratings'], List([])),
    }),
    ...pender({
        type: GET_USER_CLIPS_RECENT,
        onSuccess: (state, action) => state.setIn(['articles', 'clips'], List(action.payload.data)),
        onFailure: (state, action) => state.setIn(['articles', 'clips'], List([])),
    }),
    ...pender({
        type: GET_USER_ARTICLES_RECENT,
        onSuccess: (state, action) => state.setIn(['articles', 'articles'], List(action.payload.data)),
        onFailure: (state, action) => state.setIn(['articles', 'articles'], List([])),
    }),
}, initialState);