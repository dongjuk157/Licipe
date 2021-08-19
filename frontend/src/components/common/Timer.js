import React, { useRef, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import * as sttActions from '../../redux/modules/stt';
import { Button } from 'react-bootstrap';

const Timer = ({timer, index, ref}) => {
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.stt.get('timerState'));
  const [seconds, setSeconds] = useState(timer);
  const [pause, setPause] = useState(true);
	
  let intervalRef = useRef()
  const count = () => {
    setSeconds(secs => {
      if (secs <= 1){
        setPause(true);
        clearInterval(intervalRef.current);
        return 0;
      };
      return secs - 1;
    })
  };

  const handleClick = () => {
    if(!pause){
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(count, 1000);
    }
    setPause(prev => !prev);
  }
  
  const handleReset = () => {
    setSeconds(timer);
    setPause(true);
    clearInterval(intervalRef.current);
  }
  
  switch(timerState){
    case 'timer start':
      if(pause){
        handleClick();
      }
      dispatch(sttActions.changeTimerState(''));
      break;
    case 'timer stop':
      if(!pause){
        handleClick();
      } 
      dispatch(sttActions.changeTimerState(''));
      break;
    case 'timer reset':
      handleReset();
      dispatch(sttActions.changeTimerState(''));
      break;
    default:
  };



  
  return (
    <div id={'timer'+index} ref={ref} className="col-2 d-flex flex-column">
      <h3 className="text-center p-1">
        {Math.floor(seconds/60)}:{seconds%60}
      </h3>
      <div className="d-flex justify-content-center p-1">
        <Button 
          variant="light"
          onClick={handleClick} 
          className="handleStartStop"
        >
          { pause ? (
            <i className="fas fa-play"></i>
          ) : (
            <i className="fas fa-pause"></i>
          )}
        </Button>
        <Button
          variant="light"
          onClick={handleReset} 
          className="handleReset"
        >
          <i className="fas fa-undo"></i>
        </Button>
      </div>
    </div>
  )
}

export default Timer