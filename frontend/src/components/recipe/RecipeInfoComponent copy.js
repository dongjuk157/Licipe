import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
  Paper,
  Typography,
 } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT


const FoodImg = styled.img`
	width: 100%;
  height: 90%;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
  detail: {
    padding: theme.spacing(1),
  },
  recipeDetail: {
    width: '50vw',
  },
  recipeImage: {
    width: '100%',
    height: '30vh',
    padding: theme.spacing(1, 1, 1, 1),
  },
  recipe: {
    margin: 'auto',
  },
  recipeInfo: {

  }
}));

const RecipeInfoComponent = (props) => {
  const classes = useStyles();
  const [rating, setRating] = useState([]);
  const [state, setState] = useState({
    right: false,
  });


  const toggleDrawer = (open) => (event) => {
    setState({ ...state, right: open });
  };

  const getFoodRating = () => {
    axios.get(`/foods/${props.food.id}/recipe/rating/average`)
    .then((res) => {
      setRating(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getFoodRating();
  }, [rating])

  return (
    <div>
        <Button onClick={toggleDrawer(true)}>자세히 보기</Button>
        <Drawer anchor='right' open={state.right} onClose={toggleDrawer(false)}>
        <div
      className={classes.recipeDetail}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.detail}>
        <ListItem className={classes.recipe}>
          <Paper className={classes.recipeImage}>
            <FoodImg src={`${props.food.imgURL}`}></FoodImg>
          </Paper>
        </ListItem>
        <ListItem>
          <p>후기 {rating}</p>
          <span>{props.food.name}</span>
          <Link to={`/recipe/${props.food.id}/step`}>
            <span>요리하기</span>
          </Link>
        </ListItem>
        <ListItem>
          <p>주재료</p>
        </ListItem>
        <Divider />
        <Typography 
        color="textSecondary"
        variant="caption"
        >
          레시피 후기
        </Typography>
        <ListItem alignItems="flex-start">
        <ListItemText
          primary="맛있어요"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {" — 사실 맛 없어요"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      </List>
    </div>
        </Drawer>
    </div>
  );
};

RecipeInfoComponent.defaultProps = {
    food: {
      id: 1,
    },
};

export default RecipeInfoComponent;