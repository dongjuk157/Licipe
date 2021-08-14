import React, { useRef, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import * as sttActions from '../../redux/modules/stt';

const Timer = ({timer, index, ref}) => {
  const dispatch = useDispatch()
  const timerState = useSelector((state) => state.stt.get('timerState'))
  const [seconds, setSeconds] = useState(timer)
  const [pause, setPause] = useState(true)
	
  let intervalRef = useRef()
  const count = () => {
    setSeconds(secs => {
      if (secs <= 1){
        setPause(true)
        clearInterval(intervalRef.current)
        return 0
      }
      return secs - 1
    })
  }

  const handleClick = () => {
    if(!pause){
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(count, 1000)
    }
    setPause(prev => !prev)
  }
  
  const handleReset = () => {
    setSeconds(timer)
    setPause(true)
    clearInterval(intervalRef.current)
  }
  
  switch(timerState){
    case 'timer start':
      if(pause){
        handleClick()
      }
      dispatch(sttActions.changeTimerState(''))
      break
    case 'timer stop':
      if(!pause){
        handleClick()
      } 
      dispatch(sttActions.changeTimerState(''))
      break
    case 'timer reset':
      handleReset()
      dispatch(sttActions.changeTimerState(''))
      break
    default:
  }



  
  return (
    <div id={'timer'+index} ref={ref}>
      <h3>
        {Math.floor(seconds/60)}:{seconds%60}
      </h3>
      <div>
        <button onClick={handleClick} className="handleStartStop">{pause?"start":"pause"}</button>
        <button onClick={handleReset} className="handleReset">reset</button>
      </div>
    </div>
  )
}

export default Timer