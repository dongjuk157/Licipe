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
    position: 'relative',
    boxSizing: 'border-box',
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '30px',
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
  },
  container: {

  }
}));

const RecipeInfoComponent = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Container className={
        classes.detail, 'bg-white'} 
        style={{    
          position: 'relative',
          boxSizing: 'border-box',
          height: '90vh',
          // overflowX: 'hidden',
          overflowY: 'scroll',
          alignItems: 'center',
          justifyContent: 'center', 
          marginTop:'20px'
        }}>
        <ListItem className={classes.recipe}>
          <Paper className={classes.recipeImage}>
            <FoodImg src={`${props.food.imgURL}`}></FoodImg>
          </Paper>
        </ListItem>
        <ListItem>
          <div>
          <Typography className="fs-4 ms-2 mb-1" style={{ fontFamily: 'twayfly' }}>{props.food.name}</Typography>
          <div className="align-items-end">
            <span className="fs-4 ms-2 mb-1">🌟 {props.rating}</span>
            <span>/5</span>
          </div>
          </div>
          <Button variant="outline-primary" 
            className="ms-auto me-1 bg-white" 
            size="lg">
            <Link className="text-decoration-none" to={`/recipe/${props.food.id}/step`}>
            <i className="fas fa-utensils"></i>
            </Link>
          </Button>
        </ListItem>
        <Typography 
        color="textSecondary"
        variant="caption"
        className="m-3"
        >
          메인 재료
        </Typography>
        <div className="m-3 mt-1 d-flex flex-wrap" style={{ fontFamily: 'Noto Sans CJK KR' }}>
          { props.ingredientsList.map((ingredient, index) => {
            return (
              ingredient.main?
                (<div claaName="col-5" style={{ fontFamily: 'Noto Sans CJK KR' }}>
                  {ingredient.ingredient.name} 
                  <span style={{ marginInline: "3px"}}>{ingredient.ingredient.weight}{ingredient.ingredient.unit}</span>
                  <span style={{ marginInlineEnd: "3px", color: "#ff4a6b"}}>| </span>
                </div>)
                : <></>
            )
          })
          }
        </div>
        <Divider />
        <Typography 
        color="textSecondary"
        variant="caption"
        className="m-3"
        >
          조리 후기
        </Typography>
        <ListItem alignItems="flex-start">
        <ListItemText
          primary="맛있어요"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
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
  );
};

RecipeInfoComponent.defaultProps = {
    food: {
      id: 1,
    },
};

export default RecipeInfoComponent;