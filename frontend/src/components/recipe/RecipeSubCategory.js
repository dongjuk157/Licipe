import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	 Typography,
	//  CardMedia,
	//  CardContent,
	//  CardActions,
	//  CardActionArea,
	//  Card,
	 } from '@material-ui/core';

import { Button, ButtonGroup, Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const RecipeSubCategory = (props) => {
	const [foodList, setFoodList] = useState([]);
	useEffect(() => {
		setFoodList(props.categoryFoodList[0]);
	})
    return (
			<div className="d-flex flex-wrap mb-3">
				{foodList && foodList.map((food, index) => {
					return (
						<Container key={food.name + index} className="row col-6 col-lg-4">
							<Card style={{ width: '18rem' }} className="my-2 mx-0 pt-3">
								<Card.Img variant="top" src={food.imgURL} fluid/>
								<Card.Body className="px-1">
									<Card.Text className="overflow-auto pb-5 fs-6" style={{height: '10rem;'}}>{food.name}</Card.Text>
									<Button variant="outline-primary" className="position-absolute bottom-0 end-0 m-3">
										<Link className="text-decoration-none" to={`/recipe/${food.id}/step`}>
										<i class="fas fa-utensils"></i>
										</Link>
									</Button>
								</Card.Body>
							</Card>
						</Container>
					)
				})}
			</div>
	)
};

export default RecipeSubCategory;