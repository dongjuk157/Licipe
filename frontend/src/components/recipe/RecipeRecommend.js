import React, { useState, useEffect, useRef } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import RecipeInfoComponent from './RecipeInfoComponent';
import styled from 'styled-components';
import storage from '../../lib/storage';
import { Button, ButtonGroup, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../style/recipe_recommend.css';
import 'bootstrap';
import '../../style/scrollbar.css';
import { useDispatch } from 'react-redux';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT
const currentUserInfo = storage.get('loggedInfo')

const FoodImg = styled.img`
	width: 100%;
  height: 80%;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
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
	const dispatch = useDispatch;
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const [foodList, setFoodList] = useState([]);
	const getFoodList = () => {
	axios.get('/foods')
	.then((res) => {
		// console.log(res)
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

	const [ detailTarget, setDetailTarget ] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [rating, setRating] = useState();
	const [articles, setArticles] = useState([]);
	const getDetailTarget = ((food) => {
		setDetailTarget(food);

		console.log(food.id)
    axios.get(`/foods/${food.id}/ingredients`)
    .then((res) => {
      setIngredients(res.data)
    })
    .catch((err) => {
      console.log(err)
		})
		
		axios.get(`/foods/${food.id}/recipe/rating/average`)
    .then((res) => {
      setRating(res.data)
    })
    .catch((err) => {
      console.log(err)
		})
		
		axios.get(`/foods/${food.id}/articles`)
		.then((res) => {
			setArticles(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
	});

	return (
		<div className="col-12 justify-content-center" style={{ height: '100vh%'}}>
			<SearchAppBar></SearchAppBar>
			<div className="col-11 mx-auto bg-white">
			<a
			href="#scrollspyHeading1" 
			style={{ position: 'fixed', bottom:15, left:15,behavior: 'smooth' }}
			>
				<i className="fas fa-arrow-up" style={{fontSize:'2rem'}} />
			</a>
			<Row className="overflow-hidden">
				<Col         
				style={{    
					position: 'relative',
          boxSizing: 'border-box',
          maxHeight: '90vh',
          // overflowX: 'hidden',
          overflowY: 'scroll',
          alignItems: 'center',
          justifyContent: 'center', 
          marginTop:'20px'
				}} 
				
				className={"scrollbar-primary d-flex flex-wrap mx-auto "
				+ (detailTarget.length !== 0? "col-6":"col-9")}
				>
				<p id="scrollspyHeading1" style={{ display:'hidden'}}></p>
						{foodList.map((food, index) => {
							// const lastEl = index === foodList.length - 1;
							const foodObject = {'id': food.id, 'name': food.name, 'imgURL': food.imgURL}
							return (
								<Container 
								className={"row boder-0 g-2 "
								+ (detailTarget.length !== 0? 
									"col-12 col-lg-6 ms-auto px-2":"col-6 col-lg-4 mx-auto px-1"
									)}
									key={index}>
								<Card style={{ width: '18rem' }} 
									className="my-2 mx-0 me-3 ms-auto pt-3 shadow-sm border-0">
								<Card.Img variant="top" 
									src={food.imgURL} 
									className="img-fluid" />
									<Card.Body className="">
										<Row>
										<Card.Text 
											className="col-10 overflow-auto fs-6 my-auto text-center" 
											style={{ height: '4rem'}}>
											{food.name}
										</Card.Text>
										</Row>
										<Row className="d-flex">
											<Col className="align-self-center">
											</Col>
											<Col>
												<ButtonGroup className="d-flex col-9 ms-auto">											
													<Col className="">
														<Button variant="outline-primary" className="">
															<Link className="text-decoration-none" 
																to={`/recipe/${food.id}/step`}>
																<i className="fas fa-utensils"></i>
															</Link>
														</Button>
													</Col>
													<Col>
														<Button 
															onClick={() => {
																getDetailTarget(foodObject)}
															}
															className="mx-2">
															<i className="fas fa-search"></i>
														</Button>
													</Col>
												</ButtonGroup>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							</Container>
							)
						})}
				</Col>
			{
				detailTarget && detailTarget.length !== 0 ?
				(<Col 
					style={{    
						position: 'relative',
						boxSizing: 'border-box',
						height: '85vh',
						// overflowX: 'hidden',
						overflowY: 'scroll',
						alignItems: 'center',
						justifyContent: 'center', 
						marginTop:'20px'
					}} 
					xs={6} lg="5" className="bg-white shadow mt-2 rounded">
					<RecipeInfoComponent 
					food={detailTarget} 
					ingredientsList={ingredients} 
					rating={rating}
					articleList={articles}
					>
					</RecipeInfoComponent>
				</Col>)
			: <></>
		}
			</Row>
		</div>
		</div>
	);
}

export default RecipeRecommend;