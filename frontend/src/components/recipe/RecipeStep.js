import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components';
import SpeechToText from '../common/SpeechToText'
import { useDispatch, useSelector } from 'react-redux';
import * as sttActions from '../../redux/modules/stt';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT


const Carousel = styled.div`
	margin: 100px 0 0 0;
	align-items: center;
`

const RecipeStep = (props) => {
	const dispatch = useDispatch()
	const [steps, setSteps] = useState([]);
	const [stepIndex, setStepIndex] = useState(0)
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
			console.log(res.data)
			setSteps(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
	}
	useEffect(() => {
		GetRecipeSteps();
	}, [])
	
	const [isMuted, setIsMuted] = useState(true)
	const handleMuted = (state) => setIsMuted(state)
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
		// console.log(video)
		if (video){
			video.playbackRate = speed
			// console.log(video, speed, video.playbackRate)
		}
	}, [stepIndex])
	const command = useSelector((state) => state.stt.get('command'));
	const slider = useRef();
	switch (command){
		case 'next': 
			if (stepIndex < steps.length){
				setStepIndex(stepIndex + 1)
				slider.current.slickNext()
			}
			break
		case 'previous':
			if (stepIndex > 0){
				setStepIndex(stepIndex - 1)
				slider.current.slickPrev()
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
		default:
	}
	// if (command === 'next'){
	// 	if (stepIndex < steps.length){
	// 		setStepIndex(stepIndex + 1)
	// 		slider.current.slickNext()
	// 	}
	// }
	// else if (command === 'previous'){
	// 	if (stepIndex > 0){
	// 		setStepIndex(stepIndex - 1)
	// 		slider.current.slickPrev()
	// 	}
	// }
	// else if (command === 'start'){
	// 	handlePlay()
	// }
	// else if (command === 'stop'){
	// 	handlePause()
	// }
	// else if (command === 'speed slower'){
	// 	setPlaybackRateIndex(playbackRateIndex <= 0 ? 0 : playbackRateIndex - 1)
	// 	handleSpeed(playbackRate[playbackRateIndex])
	// }
	// else if (command === 'speed faster'){
	// 	setPlaybackRateIndex(playbackRateIndex >= playbackRate.length - 1 ? playbackRate.length - 1 : playbackRateIndex + 1)
	// 	handleSpeed(playbackRate[playbackRateIndex])
	// }
	// else if (command === 'speed normal'){
	// 	const normalSpeedIndex = playbackRate.findIndex((element)=> element===1)
	// 	setPlaybackRateIndex(normalSpeedIndex)
	// 	handleSpeed(playbackRate[playbackRateIndex])
	// }
	//

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
		<div>
			<SearchAppBar></SearchAppBar>
			<SpeechToText
				micState={micState}
			/>
			<Carousel>
				<h1>요리 단계</h1>
				<Slider {...settings}
					ref={slider}
				>
					{steps.map((step, index) => {
						return (
						<div key={index}>
							<video 
								id={'video'+index}
								controls crossOrigin="anonymous"
								muted={isMuted}
								autoPlay={true}
								onEnded={()=>	dispatch(sttActions.changeInput({name:'command', value:'next'}))}
							>
								<source src={`${step.videoUrl}`}></source>
							</video>
							<p>{step.description}</p>
						</div>
						)
					})}
					<Link to={{
						pathname: `/article`,
						state: { foodid },
						}}>
						<div>
							사진찍고 요리 인증하기
						</div>
					</Link>
				</Slider>
			</Carousel>
		</div>
	)
}

export default RecipeStep;
