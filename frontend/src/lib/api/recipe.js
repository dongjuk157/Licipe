import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

export const setRating = ({ score, food, member }) => {
  console.log(score, food, member)
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/foods/${food.id}/recipe/rating`,
    data: {
      score,
      food,
      member:{
        id: member.userid
      }
    },
  };
  return axios(config);
}

export const setScrap = ({ user, recipeId }) => {
  
}