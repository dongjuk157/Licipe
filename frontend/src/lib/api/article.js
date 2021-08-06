import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL
const PORT = process.env.REACT_APP_API_PORT

export const uploadArticle = (formData) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/article`,
    body: formData,
  }
  return axios(config)
}

export const getArticlesPage = (page) => {}
export const getArticle = (articleid) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/article/${articleid}`,
  }
  return axios(config)
}
export const editArticle = (formData, articleid) => {
  const config = {
    method: 'put',
    url: `${BASE_URL}:${PORT}/article/${articleid}`,
    body: formData,
  }
  return axios(config)
}
export const deleteArticle = (articleid) => {
  const config = {
    method: 'delete',
    url: `${BASE_URL}:${PORT}/article/${articleid}`,
  }
  return axios(config)
}

export const uploadImage = (formData) => {
  const config = {
    method: 'post',
    url: `${BASE_URL}:${PORT}/article/image`,
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  }
  return axios(config)
}
export const deleteImage = () => {}
export const editImage = () => {}

