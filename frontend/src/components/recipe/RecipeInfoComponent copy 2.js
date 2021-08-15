import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  Paper,
  Typography,
 } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

// jj
import { Button, Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap';
import Rating from '@material-ui/lab/Rating';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT


const FoodImg = styled.img`
	width: 100%;
  height: 100%;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: '100%',
  },
  detail: {
    padding: theme.spacing(1),
  },
  recipeDetail: {
    width: '50vw',
  },
  recipeImage: {
    marginTop: '10%',
    width: '100%',
    height: '100%',
    padding: theme.spacing(1, 1, 1, 1),
  },
  recipe: {
    margin: 'auto',
  },
  recipeInfo: {

  },
  inline: {
    marginBottom: '3px'
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
        <Button onClick={toggleDrawer(true)}><i class="fas fa-search"></i></Button>
        <Drawer anchor='right' open={state.right} onClose={toggleDrawer(false)}
        className={classes.drawer}
        >
        <div
      className={classes.recipeDetail}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Container className={classes.detail}>
        <ListItem className={classes.recipe}>
          <Paper className={classes.recipeImage}>
            <FoodImg src={`${props.food.imgURL}`}></FoodImg>
          </Paper>
        </ListItem>
        <ListItem>
          <div>
          <Typography className="fs-4 ms-2 mb-1">{props.food.name}</Typography>
          <Rating name="read-only" value={rating} size="large"readOnly />
          </div>
          <Button variant="outline-primary" className="ms-auto me-1" size="lg">
            <Link className="text-decoration-none" to={`/recipe/${props.food.id}/step`}>
            <i class="fas fa-utensils"></i>
            </Link>
          </Button>
        </ListItem>
        <Typography 
        color="textSecondary"
        variant="caption"
        className="m-3"
        >
          재료
        </Typography>
        <ListItem className="">
          재료1 - 300g | 재료2 - 3스푼, 
        </ListItem>
        <Divider />
        <Typography 
        color="textSecondary"
        variant="caption"
        className="m-3"
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
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}


            </React.Fragment>
          }
        />
      </ListItem>
      <Divider/>
      </Container>
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