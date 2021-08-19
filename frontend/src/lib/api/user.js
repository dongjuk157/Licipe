import axios from 'axios';
import storage from '../../lib/storage';

const BASE_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;
const loggedInfo = storage.get('loggedInfo'); // 로그인 정보

export const getUserInfo = (userid) => axios.get(`${BASE_URL}:${{PORT}}/member/${userid}`);
export const editUserInfo = (member) => {
  const config = {
    method: 'put',
    url: `${BASE_URL}:${{PORT}}/member/${member.id}`,
    data:{
      member
    },
  };
  return axios(config);
};

export const deleteUser = (member) => {
  const config = {
    method: 'delete',
    url: `${BASE_URL}:${PORT}/member/${member.id}`,
    data:{
      member
    },
  };
  return axios(config);
};

export const getUserRatings = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/member/ratings`,
    headers: {
      snsId: loggedInfo.snsId,
    }
  };
  return axios(config);
};
export const getUserArticles = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/member/articles`,
    headers: {
      snsId: loggedInfo.snsId,
    }
  };
  return axios(config);
};
export const getUserClips = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/member/myclips`,
    headers: {
      snsId: loggedInfo.snsId,
    }
  };
  return axios(config);

};
export const getUserRatingsRecent = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/member/ratings/recent`,
    headers: {
      snsId: loggedInfo.snsId,
    }
  };
  return axios(config);
};
export const getUserClipsRecent = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/member/myclips/recent`, 
    headers: {
      snsId: loggedInfo.snsId,
    }
  };
  return axios(config);
};
export const getUserArticlesRecent = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/member/articles/recent`, 
    headers: {
      snsId: loggedInfo.snsId,
    }
  };
  return axios(config);
};