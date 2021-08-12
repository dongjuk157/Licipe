import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components';
import SpeechToText from '../common/SpeechToText'
import { useSelector } from 'react-redux';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT


const Carousel = styled.div`
	margin: 100px 0 0 0;
	align-items: center;
`

const RecipeStep = (props) => {
	const [steps, setSteps] = useState([]);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
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
	
	const command = useSelector((state) => state.stt.get('command'))
	console.log("command: ", command)
	return (
		<div>
			<SearchAppBar></SearchAppBar>
			<SpeechToText/>
			<Carousel>
				<h1>요리 단계</h1>
				<Slider {...settings}>
					{steps.map((step, index) => {
						return (
						<div key={index}>
							<video controls crossOrigin="anonymous">
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
