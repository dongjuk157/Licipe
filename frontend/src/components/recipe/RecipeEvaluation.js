import React, { useEffect, useState } from "react";
import SearchAppBar from './../common/SearchAppBar';
import { useHistory, useLocation } from 'react-router'
import Rating from '@material-ui/lab/Rating';
import { Button } from 'react-bootstrap';
import storage from '../../lib/storage';
import * as recipeActions from "../../redux/modules/recipe";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import * as userActions from "../../redux/modules/user";
import * as _ from 'loadsh';


axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT

const RecipeEvaluation = (props) => {
	const [rating, setRating] = useState(3);
	const [evalu, setEvalu] = useState('어떠셧나요');
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const postSuccess = useSelector((state) => state.recipe.get('postSuccess'));
  const currentUserInfo = storage.get('loggedInfo');

  const result = useSelector((state) => state.user.get('result')).toJS();
  
  let food = null;
  try {
    food = location.state.food;
  } catch (e) {}
  useEffect(()=>{
    if (!food) 
      return ;
    async function getRatings () {
      await dispatch(userActions.getUserRatings());
    }
    getRatings();
    return dispatch(userActions.initializeForm('result'));
  }, [])

  if (!food) {
    alert('잘못된 접근입니다.');
    history.push('/');
    return <></>
  }
  const ratingList = Object.assign(result);
  const alreadyEval = ratingList.filter((item)=>{
    return _.isEqual(item.food, food);
  })
  if (alreadyEval.length > 0){
    alert("이미 평가한 요리입니다.");
    history.push('/MyPage');
    console.log(alreadyEval);
  }


  const recipeRating = async () => {
    console.log(rating, currentUserInfo)
    // score, food, member
    await dispatch(recipeActions.setRating({ score:rating, food, member:currentUserInfo }))
    history.push(`/`)
  }
  

  return (
    <>
      <SearchAppBar></SearchAppBar>
      <div className="p-3 container">
        <div className="col-12 col-lg-8 mx-auto align-items-center d-flex flex-column">
          <h1>레시피는 어땠나요?</h1>
          {/* <div className="d-flex flex-column col-12 col-lg-6"> */}
          <input 
            placeholder='레시피가 어땠는지 짧게 남겨주세요'
            onChange={(event) => setEvalu(event.target.value)}
            className="w-100 m-3"
          >
          </input>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newRating) => {
              setRating(newRating);
            }}
            className="m-3"
          />
          <Button 
            color="primary" onClick={recipeRating}
            className="m-3"
          >
            평가하기
          </Button>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default RecipeEvaluation;