import React, { useEffect, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../style/scrollbar.css';

const RecipeSubCategory = (props) => {
	const [foodList, setFoodList] = useState([]);
	useEffect(() => {
		setFoodList(props.categoryFoodList[0]);
	})
    return (
			<div style={{    
				position: 'relative',
				boxSizing: 'border-box',
				maxHeight: '90vh',
				// overflowX: 'hidden',
				overflowY: 'scroll',
				justifyContent: 'center', 
				marginTop:'20px'
			}} className="scrollbar-primary d-flex flex-wrap mb-3 justify-content-start">
				{foodList && foodList.map((food, index) => {
					return (
						<Container key={food.name + index} className="row col-6 col-lg-4 g-2">
							<Card style={{ width: '18rem' }} className="my-2 mx-0 pt-3 border-0 shadow-sm">
								<Card.Img variant="top" src={food.imgURL} className="img-fluid"/>
								<Card.Body className="px-1">
									<Card.Text 
										className="overflow-auto pb-5 fs-6" 
										// style={{height: '10rem;'}}
									>{food.name}</Card.Text>
									<Button variant="outline-primary" className="position-absolute bottom-0 end-0 m-3">
										<Link className="text-decoration-none" to={`/recipe/${food.id}/step`}>
										<i className="fas fa-utensils"></i>
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