import React from 'react';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import RecipeRecommend from './components/recipe/RecipeRecommend';
import RecipeDetail from './components/recipe/RecipeDetail';
import Join from './components/user/Join'
import KakaoOAuthHandler from './components/user/KakaoOAuthHandler';
import EmailLogin from './components/user/EmailLogin';
import Article from './components/community/Article'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/reciperecommend" component={RecipeRecommend}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/join" component={Join}/>
            <Route path="/oauth/callback/kakao" component={KakaoOAuthHandler}/>
            <Route path="/login/email" component={EmailLogin}/>
            <Route path="/article" component={Article}/>
            <Route path="/recipe/:recipeid" component={RecipeDetail}/>
        </Switch>
      </Router>
  );
}

export default Routes;
