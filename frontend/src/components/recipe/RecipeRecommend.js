import React, { useState, useEffect, useRef } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import RecipeInfoComponent from './RecipeInfoComponent';
import styled from 'styled-components'


import { Button, ButtonGroup, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../style/recipe_recommend.css';
import 'bootstrap';
axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT

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

	const [ detailTarget, setDetailTarget ] = useState([]);;
	const getDetailTarget = ((food) => {
		console.log('food', food);
		setDetailTarget(food);
		
	});

	// const breakP = (()=> {
	// 	if ( detailTarget && detailTarget.length ) {
	// 		return { 
	// 			column: 9 
	// 		}
	// 	}
	// 	else {
	// 		return { 
	// 			column: 6,
	// 		}
	// 	}
	// });

	return (
		<div className="col-12 justify-content-center">
			<SearchAppBar></SearchAppBar>
			<div className="col-11 mx-auto bg-white">

			<Row>
				<Col className={"d-flex flex-wrap mx-auto "+ (detailTarget.length !== 0? "col-7":"col-9")}>
						{foodList.map((food, index) => {
							// const lastEl = index === foodList.length - 1;
							const foodObject = {'id': food.id, 'name': food.name, 'imgURL': food.imgURL}
							return (
								<Container 
								className={"row boder-0 "
								+ (detailTarget.length !== 0? "col-12 col-lg-6 ms-auto px-2":"col-6 col-lg-4 mx-auto px-1")}
								key={index}>
								<Card style={{ width: '18rem' }} className="my-2 mx-0 pt-3 shadow boder-0">
								<Card.Img variant="top" src={food.imgURL} className="img-fluid" />
									<Card.Body className="">
										<Row>
										<Card.Text 
											className="col-10 overflow-auto fs-6 my-auto text-center" 
											style={{ height: '4rem'}}>
											{food.name}
										</Card.Text>
										{/* 수정중 */}
											<Link 
												className="col-1 far fa-heart text-start my-1 text-decoration-none" 
												style={{ fontSize: '1rem', color: '#ff4a6b' }}>
											</Link>
											{/* className="fas fa-bookmark" */}
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
														<Button onClick=
															{() => getDetailTarget(foodObject)} 
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
				(<Col xs={5} className="bg-white shadow h-100 mt-2 rounded">
					<RecipeInfoComponent food={detailTarget}>
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