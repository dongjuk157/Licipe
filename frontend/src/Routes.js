import React from 'react';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
  );
}

export default Routes;
