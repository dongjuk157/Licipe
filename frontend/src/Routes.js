import React from 'react';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import KakaoOAuthHandler from './components/user/KakaoOAuthHandler';
import Main from './components/recipe/Main';
import RecipeRecommend from './components/recipe/RecipeRecommend';
import RecipeSearch from './components/recipe/RecipeSearch';
import RecipeStep from './components/recipe/RecipeStep';
import Join from './components/user/Join';
import EmailLogin from './components/user/EmailLogin';
import ArticleForm from './components/community/ArticleForm';
import Community from './components/community/Community';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ArticleDetail from './components/community/ArticleDetail';
import { Error404 } from './components/common/Error404';
import RecipeEvaluation from './components/recipe/RecipeEvaluation';
import MyPage from './components/user/MyPage';
import EditProfile from './components/user/EditProfile';
import MyArticles from './components/user/MyArticles';
import MyClips from './components/user/MyClips';
import MyRatings from './components/user/MyRatings';
import RecipeDetail from './components/recipe/RecipeDetail';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/reciperecommend" component={RecipeRecommend}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/logout" component={Logout}/>
        <Route path="/login/email" component={EmailLogin}/>
        <Route path="/recipe/category" component={RecipeSearch}/>
        <Route path="/recipe/:id/step" component={RecipeStep}/>
        <Route path="/oauth/callback/kakao" component={KakaoOAuthHandler}/>
        <Route path="/join" component={Join}/>
        <Route exact path="/article" component={ArticleForm}/>
        <Route path ="/article/:articleid" component={ArticleDetail}/>
        <Route exact path="/community" component={Community}/>
        <Route path="/recipe/:id/evaluation" component={RecipeEvaluation}/>
        <Route path="/recipe/:id" component={RecipeDetail}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/editprofile" component={EditProfile}/>
        <Route exact path="/myarticles" component={MyArticles}/>
        <Route exact path="/myclips" component={MyClips}/>  
        <Route exact path="/myratings" component={MyRatings}/>
        <Route path="/404NotFound" component={Error404}/>
        <Route path="*">
          <Redirect to="/404NotFound" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
