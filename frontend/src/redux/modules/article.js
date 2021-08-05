import { createAction, handleActions } from "redux-actions"
import { Map } from 'immutable'
import { pender } from "redux-pender"
import * as ArticleAPI from '../../lib/api/article'

// action types
const CHANGE_INPUT = 'article/CHANGE_INPUT'
const UPLOAD_ARTICLE = 'article/UPLOAD_ARTICLE'
const UPLOAD_IMAGE = 'article/UPLOAD_IMAGE'


// action creators
export const changeInput = createAction(CHANGE_INPUT) // {name(key), value}
export const uploadArticle = createAction(UPLOAD_ARTICLE, ArticleAPI.uploadArticle) // { userid, img, food, content}
export const uploadImage = createAction(UPLOAD_IMAGE, ArticleAPI.uploadImage) // { userid, img }

// initiate states
const initialState = Map({
  article: Map({
    data: Map({
      userid: '',
      food: '',
      content: '',
      img: '',
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
  })
}, initialState)