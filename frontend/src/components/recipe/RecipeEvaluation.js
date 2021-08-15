import React, { useEffect, useState } from "react";
import SearchAppBar from './../common/SearchAppBar'
import { useHistory } from 'react-router'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import storage from '../../lib/storage';
import * as recipeActions from "../../redux/modules/recipe";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API_URL + ':'+ process.env.REACT_APP_API_PORT


const Evaluation = styled.div`
  margin: 100px 0 0 0;
  justify: space-between;
`

const RecipeEvaluation = (props) => {
	const [rating, setRating] = useState(3);
	const [evalu, setEvalu] = useState('어떠셧나요');
  const history = useHistory();
  const dispatch = useDispatch();
  const postSuccess = useSelector((state) => state.recipe.get('postSuccess'))
  const currentUserInfo = storage.get('loggedInfo');
  const foodid = props.match.params.id

  const recipeRating = async() => {
    await dispatch(recipeActions.setRating({ rating, currentUserInfo }))
    if (postSuccess)
    history.push(`/recipe/${foodid}/step`)
  }

  useEffect(() => {
    // if (!currentUserInfo) {
    //   history.push('/login')
    // }
  }, [])
  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <Evaluation>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">레시피는 어떠셨나요?</Typography>

          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newRating) => {
              setRating(newRating);
            }}
          />
        </Box>
        <Input 
        placeholder='어떠셨나요'
        onChange={(event) => {
          setEvalu(event.target.value);
        }}></Input>
        <div>
          <Button variant="outlined" color="primary" onClick={recipeRating}>
            평가하기
          </Button>
        </div>
      </Evaluation>

    </div>
  );
}

export default RecipeEvaluation;