import React from 'react';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

const Routes = () => {
  return (
      <HashRouter hashType='hashbang'>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
      </HashRouter>
  );
}

export default Routes;
