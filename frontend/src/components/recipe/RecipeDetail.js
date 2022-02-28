import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchAppBar from '../common/SearchAppBar';
axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT

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


const RecipeDetail = (props) => {
  console.log(props)
  const classes = useStyles();
  const [food, setFood] = useState({
    imgURL: '',
    name: '불러오는 중',
    id: '0',
  });
  const foodid = props.match.params.id;
  const getFoodInfo = async () => {
    await axios.get(`/foods/${foodid}`)
    .then((res) => {
      setFood(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  } 

  useEffect(() => {
    getFoodInfo();
  }, [])

  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div className={classes.recipeDetail}>
        <List className={classes.detail}>
        <ListItem className={classes.recipe}>
          <Paper className={classes.recipeImage}>
            <img src={`${food.imgURL}`}></img>
          </Paper>
        </ListItem>
        <ListItem>
          <p>후기</p>
          <span>{food.name}</span>
          <span>{food.name}</span>
          <Link to={`/recipe/${food.id}/step`}>
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
  </div>
  );
};


export default RecipeDetail;