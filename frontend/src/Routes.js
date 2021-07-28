import React from 'react';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import RecipeRecommend from './components/recipe/RecipeRecommend';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/reciperecommend" component={RecipeRecommend}/>
        </Switch>
      </Router>
  );
}

export default Routes;
