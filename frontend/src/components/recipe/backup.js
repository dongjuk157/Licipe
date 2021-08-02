import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 700,
  },
  recipeImage: {
    width: theme.spacing(40),
    height: theme.spacing(40),
    padding: theme.spacing(2),
  },
  recipeInfo: {
    
    alignItems: 'center',
  }
}));

const RecipeDetail = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.recipeInfo}>
          <Paper className={classes.recipeImage}>
              
              음식 사진
          </Paper>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>자세히 보기</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

RecipeDetail.defaultProps = {
    recipe: null,
};

export default RecipeDetail;