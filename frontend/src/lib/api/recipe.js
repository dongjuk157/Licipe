import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

export const setRating = (rateScore, foodid) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/foods/${foodid}/recipe/rating`,
    body: rateScore,
  };
  return axios(config);
}