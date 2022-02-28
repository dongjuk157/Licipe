import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

export const checkStatus = () => axios.get(`${BASE_URL}:${PORT}/user/check`);
export const checkEmailExists = (email) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/user/exist/email/${email}`,
  };
  return axios(config);
}

export const checkUseridExists = (userid) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/user/exists/userid/${userid}`,
  };
  return axios(config);
}

export const emailJoin = ({email, userid, password}) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/join`,
    data: {
      email,
      userid,
      password,
    }
  };
  return axios(config);
}

export const emailLogin = ({userid, password}) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/login`,
    data: {
      userid,
      password,
    }
  };
  return axios(config);
}

export const logout = () => axios.get(`${BASE_URL}:${PORT}/logout`);

export const kakaoOAuthLogin = (code) => axios.get( `${BASE_URL}:${PORT}/oauth/callback/kakao?code=${code}`);