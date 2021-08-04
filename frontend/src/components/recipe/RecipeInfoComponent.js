import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
  console.log(props)
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (open) => (event) => {
    setState({ ...state, right: open });
  };

  const list = () => (
    <div
      className={classes.recipeDetail}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={classes.detail}>
        <ListItem className={classes.recipe}>
          <Paper className={classes.recipeImage}>
            {/* 이미지 API 사용해서 이미지, 리뷰, 등등 적어넣기 */}
              음식 사진
          </Paper>
        </ListItem>
        <ListItem>
          <span>레시피 제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {/* foodid props로 전달 */}
          
          <Link to={`/recipe/${props.recipe.foodid}/step`}>
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
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="최고의 bbq"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {" — 사실은 그저 그런 bbq"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="반모지"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              {' — 풀드포크'}
            </React.Fragment>
          }
        />
      </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <Button onClick={toggleDrawer(true)}>자세히 보기</Button>
        <Drawer anchor='right' open={state.right} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
    </div>
  );
};

RecipeInfoComponent.defaultProps = {
    recipe: {
      foodid: 1,
    },
};

export default RecipeInfoComponent;