import React from 'react';
import Login from './components/user/Login'
import KakaoOAuthHandler from './components/user/KakaoOAuthHandler';
import EmailLogin from './components/user/EmailLogin';
import Join from './components/user/Join'
import Main from './components/recipe/Main'
import RecipeRecommend from './components/recipe/RecipeRecommend';
import RecipeDetail from './components/recipe/RecipeDetail';
import ArticleForm from './components/community/ArticleForm'
import Community from './components/community/Community'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleDetail from './components/community/ArticleDetail';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/reciperecommend" component={RecipeRecommend}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/login/email" component={EmailLogin}/>
            <Route path="/oauth/callback/kakao" component={KakaoOAuthHandler}/>
            <Route path="/join" component={Join}/>
            <Route exact path="/article" component={ArticleForm}/>
            <Route path ="/article/:articleid" component={ArticleDetail}/>
            <Route exact path="/community" component={Community}/>
            <Route path="/recipe/:recipeid" component={RecipeDetail}/>
        </Switch>
      </Router>
  );
}

export default Routes;
