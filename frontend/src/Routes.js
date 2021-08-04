import React from 'react';
import Login from './components/user/Login'
import KakaoOAuthHandler from './components/user/KakaoOAuthHandler';
import Main from './components/recipe/Main'
import RecipeRecommend from './components/recipe/RecipeRecommend';
import RecipeDetail from './components/recipe/RecipeDetail';
import RecipeStep from './components/recipe/RecipeStep';
import Join from './components/user/Join'
import EmailLogin from './components/user/EmailLogin';
import ArticleForm from './components/community/ArticleForm'
import Community from './components/community/Community'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleDetail from './components/community/ArticleDetail';
import RecipeEvaluation from './components/recipe/RecipeEvaluation';

const Routes = () => {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/reciperecommend" component={RecipeRecommend}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/login/email" component={EmailLogin}/>
            {/* <Route path="/recipe/:id" component={RecipeDetail}/> */}
            <Route path="/recipe/:id/step" component={RecipeStep}/>
            <Route path="/oauth/callback/kakao" component={KakaoOAuthHandler}/>
            <Route path="/join" component={Join}/>
            <Route exact path="/article" component={ArticleForm}/>
            <Route path ="/article/:articleid" component={ArticleDetail}/>
            <Route exact path="/community" component={Community}/>
            <Route path="/recipe/:id/recipeevaluation" component={RecipeEvaluation}/>
        </Switch>
      </Router>
  );
}

export default Routes;
