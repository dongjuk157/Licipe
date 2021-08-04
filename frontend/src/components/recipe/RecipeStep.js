import React, { useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT
const RecipeStep = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	let steps = [];
	const { foodid } = useParams()
	const GetRecipeSteps = async () => {
		for (let i = 0; i < 20; i++) {
			try {
				// props로 받은 foodid 활용
				const response = await axios.get(`/foods/${foodid}/recipe/steps/${i}`)
					steps.push(response)
			} catch (error) {
				console.log(error)
				break
			}
		};
		useEffect(() => {
			GetRecipeSteps()
		})
	}
	return (
		<div>
			<h1>page check</h1>
			<h2> Single Item</h2>
			<Slider {...settings}>
				<div>
					{steps.map((step) => (
						<div>
							<img>step.img</img>
							<p>step.desc</p>
						</div>
						))}
				</div>
				<Link to={`/recipe/${foodid}/evaluation`}>
					<div>
					요리 끝! 요리 평가하기
					</div>
				</Link>
			</Slider>
		</div>
	)
}

export default RecipeStep;