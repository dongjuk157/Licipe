import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from '../../lib/api/auth';

// action types
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERID_EXISTS = 'auth/CHECK_USERID_EXISTS'; // 아이디 중복 확인
const EMAIL_JOIN = 'auth/EMAIL_JOIN'; // 이메일 가입
const EMAIL_LOGIN = 'auth/EMAIL_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃
const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정
const KAKAO_OAUTH_LOGIN = 'auth/KAKAO_OAUTH_LOGIN'; // 카카오 로그인, 백엔드에 인가코드 전송


// action creators
export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists); // email
export const checkUseridExists = createAction(CHECK_USERID_EXISTS, AuthAPI.checkUseridExists); // userid
export const emailJoin = createAction(EMAIL_JOIN, AuthAPI.emailJoin); // { email, userid, password }
export const emailLogin = createAction(EMAIL_LOGIN, AuthAPI.emailLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const setError = createAction(SET_ERROR); // { form, message }
export const kakaoOAuthLogin = createAction(KAKAO_OAUTH_LOGIN, AuthAPI.kakaoOAuthLogin); // code


// initiate states
const initialState = Map({
  join: Map({
    form: Map({
      email:'',
      userid:'',
      nickname:'',
      password: '',
      passwordConfirm:''
    }),
    exists: Map({
      email: false,
      userid: false
    }),
    error: Map({
      email:'',
      userid:'',
      nickname:'',
      password: '',
      passwordConfirm:''
    })
  }),
  login: Map({
    form: Map({
      email: '',
      password: ''
    }),
    error: null
  }),
  result: Map({})
});

// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { form, name, value } = action.payload;
    return state.setIn([form, 'form', name], value);
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState.get(action.payload);
    return state.set(action.payload, initialForm);
  },
  ...pender({
    type: CHECK_EMAIL_EXISTS,
    onSuccess: (state, action) => state.setIn(['join', 'exists', 'email'], action.payload.data.exists)
  }),
  ...pender({
      type: CHECK_USERID_EXISTS,
      onSuccess: (state, action) => state.setIn(['join', 'exists', 'userid'], action.payload.data.exists)
  }),
  ...pender({
    type: EMAIL_LOGIN,
    onSuccess: (state, action) => state.set('result', Map(action.payload.data))
  }),
  ...pender({
      type: EMAIL_JOIN,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data))
  }),
  ...pender({
      type: KAKAO_OAUTH_LOGIN,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data))
  }),
  [SET_ERROR]: (state, action) => {
    const { form, name, message } = action.payload
    return state.setIn([form, 'error', name], message)
  },
}, initialState)