import { createAction, handleActions } from "redux-actions";
import * as RecipeAPI from '../../lib/api/recipe';
import { pender } from "redux-pender"
import { Map } from 'immutable'

const SET_RATING = 'recipe/SET_RATING'
const SET_SCRAP = 'recipe/SET_SCRAP'

export const setRating = createAction(SET_RATING, RecipeAPI.setRating) // score, food, member
export const setScrap = createAction(SET_SCRAP, RecipeAPI.setScrap)


const initialState = Map({
  data: Map({
    userid: '',
    score: 0,
  }),
  postSuccess: false
})

export default handleActions({
  ...pender({
    type: SET_RATING,
    onSuccess: (state, action) => state.set('postSuccess', true)
  }),
  ...pender({
    type: SET_SCRAP,
    onSuccess: (state, action) => state.set('postSuccess', true)
  })
}, initialState)