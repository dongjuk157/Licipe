import React from 'react';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import Join from './components/user/Join'
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/join" component={Join}/>

        </Switch>
      </Router>
  );
}

export default Routes;
