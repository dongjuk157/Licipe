import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	 Typography,
	 Button,
	 CardMedia,
	 CardContent,
	 CardActions,
	 CardActionArea,
	 Card,
	 } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	food: {
		maxWidth: 345,
	},
});

const RecipeSubCategory = (props) => {
	const classes = useStyles();
	const [foodList, setFoodList] = useState([]);
	useEffect(() => {
		setFoodList(props.categoryFoodList[0]);
	})
    return (
			<div>
				{foodList && foodList.map((food, index) => {
					return (
						<div>
						<Card className={classes.food} key={food.name + index}>
							<CardActionArea>
								<CardMedia
									component="img"
									alt="Contemplative Reptile"
									height="140"
									image={`${food.imgURL}`}
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{food.name}
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Link to={`/recipe/${food.id}/step`}>
									<Button size="small" color="primary">
										요리하러 가기
									</Button>
								</Link>
								<Button size="small" color="primary">
									후기
								</Button>
							</CardActions>
						</Card>
						</div>
					)
				})}
			</div>
	)
};

export default RecipeSubCategory;