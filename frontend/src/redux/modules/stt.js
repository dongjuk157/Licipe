import {createAction, handleActions} from 'redux-actions'
import {Map} from 'immutable'

// action types
const CHANGE_INPUT = 'stt/CHANGE_INPUT'
const INITIALIZE_FORM = 'stt/INITIALIZE_FORM'
const CHANGE_SPEED = 'stt/CHANGE_SPEED'
const CHANGE_TIMER_STATE = 'stt/CHANGE_TIMER_STATE'


// action creators
export const changeInput = createAction(CHANGE_INPUT)
export const initializeForm = createAction(INITIALIZE_FORM)
export const changeSpeed = createAction(CHANGE_SPEED)
export const changeTimerState = createAction(CHANGE_TIMER_STATE)

// initiate states
const initialState = Map({
  command: '',
  status: false,
  playbackLength: 9,
  playbackRate: [0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2],
  playbackRateIndex: 4,
  timerState: '',
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
  [CHANGE_SPEED]: (state, action) => {
    const command = action.payload
    const playbackLength = state.get('playbackLength')
    const playbackRate = state.get('playbackRate')
    const playbackRateIndex = state.get('playbackRateIndex')
    if (command === 'faster') {
      const index = playbackRateIndex >= playbackLength - 1 ? playbackLength - 1 : playbackRateIndex + 1
      return state.set('playbackRateIndex', index)
    }
    else if (command === 'slower'){
      const index = playbackRateIndex <= 0 ? 0 : playbackRateIndex - 1
      return state.set('playbackRateIndex', index)
    }
    else if (command === 'normal'){
      const normalSpeedIndex = playbackRate.findIndex((element)=> element===1)
      return state.set('playbackRateIndex', normalSpeedIndex)
    }
  },
  [CHANGE_TIMER_STATE]: (state, action) => {
    return state.set('timerState', action.payload)
  },
}, initialState)