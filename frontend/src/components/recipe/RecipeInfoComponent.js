import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Divider,
  ListItem,
  Paper,
  Typography,
 } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import '../../style/recipe_search.css';

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

  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '1rem',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
          maxHeight: '90vh',
          // overflowX: 'hidden',
          overflowY: 'hidden',
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
                (<div key={index} style={{ fontFamily: 'Noto Sans CJK KR' }}>
                  {ingredient.ingredient.name} 
                  <span style={{ marginInline: "3px"}}>{ingredient.ingredient.weight}{ingredient.ingredient.unit}</span>
                  <span style={{ marginInlineEnd: "3px", color: "#ff4a6b"}}>| </span>
                </div>)
                : <></>
            )
          })
          }
        </div>
        <Divider className="mb-3"/>
        <Typography 
        color="textSecondary"
        variant="caption"
        className="m-3"
        >
          요리 후기
        </Typography>

    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        { props.articleList && props.articleList.map((item, index) => (
          <ImageListItem key={item.imgURL}>
            <img src={item.imgURL} alt={item.content} />
            <ImageListItemBar
              title={item.content}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              } + 'transbg'}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
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