import {createAction, handleActions} from 'redux-actions'
import {Map} from 'immutable'
import { pender } from 'redux-pender'

// action types
const CHANGE_INPUT = 'stt/CHANGE_INPUT'
const INITIALIZE_FORM = 'stt/INITIALIZE_FORM'

// action creators
export const changeInput = createAction(CHANGE_INPUT)
export const initializeForm = createAction(INITIALIZE_FORM)

// initiate states
const initialState = Map({
  command: '',
  status: false,
})

// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const {name, value} = action.payload
    if (value === 'end') 
      return state.set(name, value).set('status', true)
    return state.set(name, value)
  },
  [INITIALIZE_FORM]: (state, action) => {
    const initialForm = initialState.get(action.payload)
    return state.set(action.payload, initialForm)
  },
}, initialState)