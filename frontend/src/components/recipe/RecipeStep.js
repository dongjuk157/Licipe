import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT

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
		for (let i = 1; i < 20; i++) {
			try {
				// props로 받은 foodid 활용
				const response = await axios.get(`/foods/${foodid}/recipe/steps/${i}`)
				console.log(i)
				setSteps(prevStep => [...prevStep, response.data]);
			} catch (error) {
				console.log(error)
				break
			}
		};
	}
		useEffect(() => {
			GetRecipeSteps();
		}, []);
	
	console.log(steps)
	return (
		<div>
			<SearchAppBar></SearchAppBar>
			<Carousel>
				<h1>요리 단계</h1>
				<Slider {...settings}>
					{steps.map((step, index) => {
						return (
						<div key={index}>
							<img src={`${step.img}`}></img>
							<p>{step.description}</p>
						</div>
						)
					})}
					<Link to={`/recipe/${foodid}/evaluation`}>
					<div>
					요리 끝! 요리 평가하기
					</div>
					</Link>
				</Slider>
			</Carousel>
		</div>
	)
}

export default RecipeStep;