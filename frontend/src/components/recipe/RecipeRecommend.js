import React, { useState, useEffect, useRef } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeInfoComponent from './RecipeInfoComponent';
import styled from 'styled-components'

axios.defaults.baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT

const FoodImg = styled.img`
	width: 100%;
  height: 80%;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
  },
	papers: {
		margin: theme.spacing(10),
	},
  paper: {
		// = (8 * 10) px
		width: theme.spacing(40),
		height: theme.spacing(40),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const RecipeRecommend = () => {
const classes = useStyles();

const [images, setImages] = useState([]);
const [foodList, setFoodList] = useState([]);
const getFoodList = () => {
	axios.get('/foods')
	.then((res) => {
		console.log(res)
		setFoodList(res.data)
	})
	.catch((err) => {
		console.log(err)
	});
};

useEffect(() => {
	getFoodList();
}, [])

const viewport = useRef(null);
const target = useRef(null);

const getMoreFoodList = () => {
	setFoodList(() => {
		axios.get('/foods')
		.then((res) => {
			return [...setFoodList, ...res.data];
		})
		.catch((err) => {
			console.log(err);
		})
	});
};

	useEffect(() => {
		const options = {
			root: null,
			target,
			threshold: 1.0,
			rootMargin: '0px',
		};
		const handleIntersection = (entries, observer) => {
			entries.forEach((entry) => {
				// 교차하지 않을 경우 => 없을 경우도 포함되기 때문에 오류 발생가능
				if (!entry.isIntersecting) {
					return;
				}
				getMoreFoodList();
				observer.unobserve(entry.target);
				observer.observe(target.current);
			});
		};

		let observer;
		if (target.current) {
			observer = new IntersectionObserver(handleIntersection, options);
			observer.observe(target.current);		
		};
		return () => observer && observer.disconnect();
	}, [target, viewport]);

	return (
		<div>
			<SearchAppBar></SearchAppBar>
			<div className={classes.papers}>
				<Grid container spacing={3} ref={viewport}>
						{foodList.map((food, index) => {
							const lastEl = index === foodList.length - 1;
							return (
								<Grid item xs={6} key={food.id}>
									{/* <Link to={`/recipe/${recipe.id}`}> */}
										<Paper 
										className={classes.paper}
										key ={food.id}
										>
											<FoodImg src={`${food.imgURL}`}></FoodImg>
											{food.name}

											<RecipeInfoComponent food={food}></RecipeInfoComponent>
										</Paper>
									{/* </Link> */}
								</Grid>
							)
						})}
					{/* <div>
						<Paper className={classes.paper}>
							Material-ui V4 에서는 오류가 발생 
							findDOMNode is deprecated ~~~
							index.js의 StrictMode 삭제 및 Fragment로 변경할 시 해결
							<RecipeInfoComponent></RecipeInfoComponent>
							레시피</Paper>
					</div> */}
				</Grid>

			</div>
		</div>
	);
}

export default RecipeRecommend;