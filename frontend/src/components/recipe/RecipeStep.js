import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { useHistory } from 'react-router-dom';
import SearchAppBar from '../common/SearchAppBar'
import SpeechToText from '../common/SpeechToText'
import { useDispatch, useSelector } from 'react-redux';
import * as sttActions from '../../redux/modules/stt';
import Timer from '../common/Timer'
import { Button } from 'react-bootstrap';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT

const RecipeStep = (props) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [steps, setSteps] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [stepIndex, setStepIndex] = useState(0)
	const [foodInfo, setFoodInfo] = useState({
		imgURL: '',
		name: '',
		time: {
			maxTime: 0,
		},
	});
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: true,
		beforeChange: (current, next) => setStepIndex(next),
	};

	const foodid = props.match.params.id
	// 맨 앞의 글자가 대문자가 아닐 경우 오류발생..
	const GetRecipeSteps = async () => {
		// props로 받은 foodid 활용
		axios.get(`/foods/${foodid}/recipe`)
		.then((res) => {
			// console.log(res.data)
			setSteps(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
		axios.get(`/foods/${foodid}/ingredients`)
		.then((res) => {
			setIngredients(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
		axios.get(`/foods/${foodid}`)
		.then((res) => {
			setFoodInfo(res.data)
		})
	}

	useEffect(() => {
		GetRecipeSteps();
	}, [])
	
	// const [isMuted, setIsMuted] = useState(true)
	// const handleMuted = (state) => setIsMuted(state)
	const playbackRate = useSelector((state)=> state.stt.get('playbackRate'))
  const playbackRateIndex = useSelector((state)=> state.stt.get('playbackRateIndex'))
	const handlePlay = () => {
		const video = document.querySelector(`#video${stepIndex}`)
		video.play()
	}
	const handlePause = () => {
		const video = document.querySelector(`#video${stepIndex}`)
		video.pause()
	}
	const handleSpeed = useCallback( (speed) => {
		const video = document.querySelector(`#video${stepIndex}`) 
		if (video){
			video.playbackRate = speed
		}
	}, [stepIndex])


	const command = useSelector((state) => state.stt.get('command'))
	const slider = useRef()
	const timer = document.querySelector(`#timer${stepIndex}`) 
	// const currentTimer = useRef
	switch (command){
		case 'next': 
			if (stepIndex < steps.length){
				handlePause()
				setStepIndex(stepIndex + 1)
				slider.current.slickNext()
				if (timer){
					const buttonReset = timer.querySelector( '.handleReset')
					buttonReset.click()
				}
			}
			break
		case 'previous':
			if (stepIndex > 0){
				handlePause()
				setStepIndex(stepIndex - 1)
				slider.current.slickPrev()
				if (timer){
					const buttonReset = timer.querySelector( '.handleReset')
					buttonReset.click()
				}
			}
			break
		case 'start':
			handlePlay()
			break
		case 'stop':
			handlePause()
			break
		case 'speed slower':
			dispatch(sttActions.changeSpeed('slower'))
			break
		case 'speed faster':
			dispatch(sttActions.changeSpeed('faster'))
			break
		case 'speed normal':
			dispatch(sttActions.changeSpeed('normal'))
			break
		case 'timer start':
		case 'timer stop':
			const buttonStartStop = timer.querySelector( '.handleStartStop')
			// console.log(buttonStartStop)
			buttonStartStop.click()
			break
		case 'timer reset':
			const buttonReset = timer.querySelector( '.handleReset')
			// console.log(buttonReset)
			buttonReset.click()
			break
		default:
	}

	// 명령 한번 수행하고 커맨드 초기화
	dispatch(sttActions.changeInput({name:'command', value:''}))
	useEffect(()=>{
		handleSpeed(playbackRate[playbackRateIndex])
	}, [handleSpeed, playbackRate, playbackRateIndex])
	
	const [micState, setMicState] = useState(true)
	if (micState && steps.length !==0 && stepIndex === steps.length){
		setMicState(false)
	}

	

	return (
		<div className="mx-auto w-100 bg-white h-100">
			<SearchAppBar></SearchAppBar>
			<SpeechToText
				micState={micState}
			/>
			<div className="col-12 col-lg-8 mx-auto p-1 bg-white align-items-center">
				<Slider {...settings}
					ref={slider}
				>
					{steps.map((step, index) => {
						return (
						<div key={index} className="d-flex flex-column align-items-center col-12">
							<video 
								width="100%"
								id={'video'+index}
								controls crossOrigin="anonymous"
								// muted={isMuted}
								// autoPlay={true}
								// onEnded={()=>	dispatch(sttActions.changeInput({name:'command', value:'next'}))}
							>
								<source src={`${step.videoUrl}`}></source>
							</video>
							<div className="mt-3 p-3 w-100 d-flex" >
								<div className="col-10">
									<p>{step.description}</p>
								</div>
								{
									step.timer > 0 && 
									<Timer 
										timer={step.timer} index={index}
									/>
								}
							</div>
						</div>
						)
					})}
					<div className="d-flex flex-column align-items-center col-12">
							<Button onClick={()=>{
								history.push({
									pathname: `/article`,
									state: { foodid },
									})
							}}>
								사진찍고 요리 인증하기
							</Button>
					</div>
				</Slider>
			</div>
		</div>
	)
}

export default RecipeStep;
