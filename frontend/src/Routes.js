import React from 'react';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import Join from './components/user/Join'
import KakaoOAuthHandler from './components/user/KakaoOAuthHandler';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/join" component={Join}/>
            <Route path="/oauth/callback/kakao" component={KakaoOAuthHandler}/>

        </Switch>
      </Router>
  );
}

export default Routes;
