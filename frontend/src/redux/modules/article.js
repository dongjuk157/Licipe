import { createAction, handleActions } from "redux-actions"
import { Map } from 'immutable'
import { pender } from "redux-pender"
import * as ArticleAPI from '../../lib/api/article'

// action types
const CHANGE_INPUT = 'article/CHANGE_INPUT'
const INITIALIZE_FORM = 'article/INITIALIZE_FORM'
const UPLOAD_ARTICLE = 'article/UPLOAD_ARTICLE'
const UPLOAD_IMAGE = 'article/UPLOAD_IMAGE'
const GET_ARTICLE = 'article/GET_ARTICLE'
const EDIT_ARTICLE = 'article/EDIT_ARTICLE'
const DELETE_ARTICLE = 'article/DELETE_ARTICLE'



// action creators
export const changeInput = createAction(CHANGE_INPUT) // {name(key), value}
export const initializeForm = createAction(INITIALIZE_FORM)
export const uploadArticle = createAction(UPLOAD_ARTICLE, ArticleAPI.uploadArticle) // { formData }
export const uploadImage = createAction(UPLOAD_IMAGE, ArticleAPI.uploadImage) // { userid, img }
export const getArticle = createAction(GET_ARTICLE, ArticleAPI.getArticle) // { articleid }
export const editArticle = createAction(EDIT_ARTICLE, ArticleAPI.editArticle) // { formData, articleid }
export const deleteArticle = createAction(DELETE_ARTICLE, ArticleAPI.deleteArticle) // { articleid }

// initiate states
const initialState = Map({
  article: Map({
    data: Map({
      userid: '',
      food: '',
      content: '',
      img: '',
      articleid: null,
    }),
  }),
  postSuccess: false,
  result: Map({}),
})


// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload
    return state.setIn(['article', 'data', name], value)
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState.get(action.payload)
    return state.set(action.payload, initialForm)
  },
  ...pender({
    type: UPLOAD_ARTICLE,
    onSuccess: (state, action) => {
      return state.set(['postSuccess'], true)
    },
  }),
  ...pender({
    type: UPLOAD_IMAGE,
    onSuccess: (state, action) => {
      const { img } = action.payload
      return state.setIn(['article','data', 'img'], img)
    },
    ...pender({
      type: GET_ARTICLE,
      onSuccess: (state, action) => state.set('article', action.payload.data),
      onFailure: (state, action) => initialState
    }),
  })
}, initialState)