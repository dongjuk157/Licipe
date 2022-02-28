import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sttActions from '../../redux/modules/stt';
import { Modal, Button } from 'react-bootstrap'


// props.putValue: 상위 컴포넌트에서 내리는 값
// props.getValue: 상위 올리는 값
const SpeechToText = (props) => {
  const dispatch = useDispatch();
  // const command = useSelector((state) => state.stt.get('command'))
  const status = useSelector((state) => state.stt.get('status'));
  const commands = [
    {
      command: ['다시(.)', '시작(.)', '재생(.)'],
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
      command: ['(마이크) 끝(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'end'}))
    },
    {
      command: ['이전(.)', ' 이전 단계(.)', '뒤로(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'previous'})),
    },
    {
      command: ['다음(.)', '다음 단계(.)', '앞으로(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'next'})),
    },
    {
      command: ['타이머 시작(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'timer start'})),
    },
    {
      command: ['타이머 멈춰(.)', '타이머 그만(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'timer stop'})),
    },
    {
      command: ['타이머 리셋(.)', '타이머 다시(.)'],
      callback: () => dispatch(sttActions.changeInput({name:'command', value:'timer reset'})),
    },
    {
      command: ['명령어 (알려줘)(.)'],
      callback: () => handleShow(),
    },
    {
      command: ['(명령어) 들어가(.)'],
      callback: () => handleClose(),
    },
    
  ]

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    finalTranscript,
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  console.log(finalTranscript);
  const onSttStart = useCallback(() => {
    return SpeechRecognition.startListening({continuous: true, language:'ko-kr'});
  }, []);
  const onSttStop = useCallback((status) => { 
    if (status)
      return SpeechRecognition.stopListening();
  }, []);

  useEffect(()=>{
    onSttStart();
    onSttStop(status);
  },[onSttStart, onSttStop, status]);

  useEffect(()=>{
    if (!props.micState)
      dispatch(sttActions.changeInput({name:'command', value:'end'}));
  },[props.micState, dispatch]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const modalBodyContent = `
  1. 레시피
  이전 페이지: "이전", "이전 단계", "뒤로"
  다음 페이지: "다음", "다음 단계", "앞으로"

  2. 비디오
  재생: "다시", "시작", "재생"
  정지(일시정지): "멈춰", "잠시만"

  속도: [0.6, 0.7, 0.8, 0.9, 1(*), 1.25, 1.5, 1.75, 2]
  1배속: "정상 속도"
  한 단계 빠르게: "빠르게"
  한 단계 느리게: "느리게"

  3. 타이머
  시작: "타이머 시작"
  일시정지: "타이머 멈춰", "타이머 그만"
  리셋: "타이머 리셋", "타이머 다시"

  4. 음성인식
  명령어 : "명령어", "명령어 알려줘"
  명령어 끄기: "들어가", "명령어 들어가"
  마이크 끄기: "끝", "마이크 끝"
  마이크 켜기: 마이크를 끄고 음성 인식이 가능할거라 생각하십니까?
  `.split('\n').map((sentence, index)=>(<p key={index}>{sentence}</p>));
  

  return (
    <div style={{position:'absolute', right:'5%', bottom:'5%' }}>
      <div style={{fontSize:'1rem'}}>
        {listening ? (
          <i className="fas fa-microphone fa-lg" style={{color:'red', marginRight: 10}} onClick={onSttStop}></i> 
        ) : (
          <i className="fas fa-microphone-slash fa-lg" style={{ marginRight: 5 }} onClick={onSttStart}></i>
        )}
        <Button variant="light" onClick={handleShow}>
          ?
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} style={{ zIndex:'2000'}}>
        <Modal.Header closeButton >
          <Modal.Title>명령어 모음</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBodyContent}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SpeechToText
