import { combineReducers } from "redux"
import auth from './auth'
import user from './user'
import article from './article'
import { penderReducer } from "redux-pender"

export default combineReducers({
  auth,
  user,
  article,
  pender: penderReducer,
})