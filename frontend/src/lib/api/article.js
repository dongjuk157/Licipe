import axios from 'axios';
import AWS from 'aws-sdk';

const BASE_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;

export const uploadArticle = (data) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/article`,
    data, //content, imgURL, food, member 
    // headers: {
    //   'content-type': 'application/json'
    // },
  };
  return axios(config);
};

export const getArticlesPage = (page=null) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/articles${page?'/'+page:''}`,
  };
  return axios(config);
};
export const getArticle = (articleid) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/article/${articleid}`,
  };
  return axios(config);
};
export const editArticle = (data, articleid) => {
  const config = {
    method: 'put',
    url: `${BASE_URL}:${PORT}/article/${articleid}`,
    data, // content, imgURL, food, member 
  };
  return axios(config);
};
export const deleteArticle = (articleid) => {
  const config = {
    method: 'delete',
    url: `${BASE_URL}:${PORT}/article/${articleid}`,
  };
  return axios(config);
};

export const uploadImage = (formData) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/article/image`,
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  };
  return axios(config);
};

export const deleteImage = () => {};
export const editImage = () => {};

export const uploadS3 = (formData) => {
  AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID
    }),
  });
  const config = {
    params: {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
      Key: formData.get('file')['name'],
      Body: formData.get('file'),
    },
  };
  const upload = new AWS.S3.ManagedUpload(config);
  return upload.promise();
};

export const updateFeed = () => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/articles`,
    // url: `https://picsum.photos/v2/list?page=${count}&limit=10`, // test용도
  };
  return axios(config);
};