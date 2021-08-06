import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_PORT

const RecipeEvaluation = (props) => {
	const [rating, setRating] = useState(3);
	const [evalu, setEvalu] = useState('어떠셧나요');
  const foodid = props.match.params.id

  const recipeRating = () => {
    axios.post(`/foods/id/${foodid}/rating`, { rating: rating })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    // <div className={classes.container}>
    <div>
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
      placeholder='어떠셧나요'
      onChange={(event) => {
        setEvalu(event.target.value);
      }}></Input>
      <div>
        <Button variant="outlined" color="primary" onClick={recipeRating}>
          평가하기
        </Button>
      </div>

    </div>
  );
}

export default RecipeEvaluation;