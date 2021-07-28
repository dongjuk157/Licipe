import React from "react"
import axios from "axios"
import { CircularProgress } from "@material-ui/core"

const KakaoOAuthHandler = ({history}) => {
  const code = new URL(window.location.href).searchParams.get("code")
  const BASE_URL = process.env.REACT_APP_API_URL
  const PORT = process.env.REACT_APP_API_PORT
  const config = {
    method: 'get',
    url: `${BASE_URL}:${PORT}/oauth/callback/kakao?code=${code}`,
  }
  // console.log(code)
  axios(config)
    .then(res => {
      // console.log(res)
      const ACCESS_TOKEN = res.data.ACCESS_TOKEN
      localStorage.setItem("token", ACCESS_TOKEN)
      history.push('/')
  }).catch(e =>{
    // console.log(e)
    history.push("/login")
  })

  return (
    <CircularProgress />
  )
}

export default KakaoOAuthHandler