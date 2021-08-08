import react, { useEffect } from 'react';
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

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});


const RecipeSubCategory = (props) => {
	console.log(props, '세부페이지 갱신')
	useEffect(() => console.log('how'), [props.recipeList])
	const classes = useStyles();
	let recipeList = props.recipeList
    return (
			<div>
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="140"
							image="/static/images/cards/contemplative-reptile.jpg"
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								레시피이름
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary">
							요리하러 가기
						</Button>
						<Button size="small" color="primary">
							후기
						</Button>
					</CardActions>
				</Card>
				{recipeList.map((recipe, index) => {
					return (
						<Card className={classes.root} key={index}>
							<CardActionArea>
								<CardMedia
									component="img"
									alt="Contemplative Reptile"
									height="140"
									image="/static/images/cards/contemplative-reptile.jpg"
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										레시피이름
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button size="small" color="primary">
									요리하러 가기
								</Button>
								<Button size="small" color="primary">
									후기
								</Button>
							</CardActions>
						</Card>
					)
				})}
			</div>
	)
};

export default RecipeSubCategory;