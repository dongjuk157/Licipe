import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sttActions from '../../redux/modules/stt';


// props.putValue: 상위 컴포넌트에서 내리는 값
// props.getValue: 상위 올리는 값
const SpeechToText = (props) => {
  const dispatch = useDispatch()
  // const command = useSelector((state) => state.stt.get('command'))
  const status = useSelector((state) => state.stt.get('status'))
  const commands = [
    {
      command: ['다시(.)', '시작(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'start'}))
    },
    {
      command: ['멈춰(.)', '잠시만(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'stop'}))
    },
    {
      command: '느리게(.)',
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'speed slower'}))
    },
    {
      command: '빠르게(.)',
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'speed faster'}))
    },
    {
      command: '더(.)',
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'more'}))
    },
    {
      command: ['정상속도(로)(.) (보여줘.)', '정상 속도(로)(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'speed normal'}))
    },
    {
      command: ['(지금) 속도(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'speed current'}))
    },
    {
      command: ['끝(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'end'}))
    },
    {
      command: ['이전(.)', ' 이전 단계(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'previous'})),
    },
    {
      command: ['다음(.)', '다음 단계(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'next'})),
    },
  ]

  const {
    finalTranscript,
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  const onSttStart = useCallback(() => {
    return SpeechRecognition.startListening({continuous: true, language:'ko-kr'})
  }, [])
  const onSttStop = useCallback((status) => { 
    if (status)
      return SpeechRecognition.stopListening()
  }, [])

  useEffect(()=>{
    onSttStart()
    onSttStop(status)
  },[onSttStart, onSttStop, status])

  useEffect(()=>{
    if (!props.micState)
      dispatch(sttActions.changeInput({name:'command', value:'end'}))
  },[props.micState, dispatch])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  
  
  return (
    <>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>{transcript}</p>
    </>
  )
}

export default SpeechToText
