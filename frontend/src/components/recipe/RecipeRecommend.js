import React, { useState, useEffect, useRef } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from'axios';
import { Link } from 'react-router-dom';
import RecipeDetail from './RecipeDetail';



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

axios.defaults.baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT
const RecipeRecommend = () => {
const classes = useStyles();

const [images, setImages] = useState([]);
const [recipeList, setRecipeList] = useState([]);
const getRecipeList = () => {
	axios.get('/foods')
	.then((res) => res.json())
	.then((data) => {
		let result = data
		setRecipeList(result)
	})
	.catch((err) => {
		console.log(err)
	});
};

const viewport = useRef(null);
const target = useRef(null);

const getMoreRecipeList = () => {
	setRecipeList((prevState) => {
		axios.get(`/foods/${prevState.length + 1}`)
		.then((res) => res.json())
		.then((data) => {
			return [...setRecipeList, ...data];
		})
		.catch((err) => {
			console.log(err)
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
				getMoreRecipeList();
				observer.unobserve(entry.target);
				observer.observe(target.current)
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
				<Grid container spacing={3}>
					<section ref={viewport}>
						{recipeList.map((recipe) => {
							const lastEl = 'index' === recipeList.length - 1;
							return (
								<Grid item xs={6}>
									{/* <Link to={`/recipe/${recipe.id}`}> */}
										<Paper 
										className={classes.paper}
										>
											<img src={recipe.image}></img>
											<RecipeDetail recipe={recipe}></RecipeDetail>
										</Paper>
									{/* </Link> */}
								</Grid>
							)
						})}
					</section>
					<div>
						<Paper className={classes.paper}>
							{/* Material-ui V4 에서는 오류가 발생 
							findDOMNode is deprecated ~~~
							index.js의 StrictMode 삭제 및 Fragment로 변경할 시 해결 */}
							<RecipeDetail></RecipeDetail>
							레시피</Paper>
					</div>
				</Grid>

			</div>
		</div>
	);
}

export default RecipeRecommend;