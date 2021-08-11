import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL
const PORT = process.env.REACT_APP_API_PORT


export const getUserInfo = (userid) => axios.get(`${BASE_URL}:${{PORT}}/member/${userid}`)
export const editUserInfo = (member) => {
  const config = {
    method: 'put',
    url: `${BASE_URL}:${{PORT}}/member/${member.id}`,
    data:{
      member
    },
  }
  return axios(config)
}

export const deleteUserInfo = (member) => {
  const config = {
    method: 'delete',
    url: `${BASE_URL}:${{PORT}}/member/${member.id}`,
    data:{
      member
    },
  }
  return axios(config)
}