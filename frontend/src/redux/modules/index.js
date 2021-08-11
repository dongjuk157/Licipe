import { combineReducers } from "redux"
import auth from './auth'
import user from './user'
import article from './article'
import recipe from './recipe'
import { penderReducer } from "redux-pender"

export default combineReducers({
  auth,
  user,
  article,
  recipe,
  pender: penderReducer,
})