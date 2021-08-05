import React, { useEffect } from "react"
import axios from "axios"
import { CircularProgress } from "@material-ui/core"

const KakaoOAuthHandler = ({history}) => {

  // console.log(code)
  useEffect( () => {
    const code = new URL(window.location.href).searchParams.get("code")
    const BASE_URL = process.env.REACT_APP_API_URL
    const PORT = process.env.REACT_APP_API_PORT
    async function SubmitServer() {
      const config = {
        method: 'get',
        url: `${BASE_URL}:${PORT}/oauth/callback/kakao?code=${code}`,
      }
      // console.log(config)
      await axios(config)
      .then(res => {
        console.log(res)
        const ACCESS_TOKEN = res.data.accessToken
        localStorage.setItem("token", ACCESS_TOKEN)
        history.push('/')
      }).catch(e =>{
        // console.log(e)
        history.push("/login")
      })
    }
    SubmitServer()
    console.log("end")
  }, [])
    
  return (
    <CircularProgress />
  )
}

export default KakaoOAuthHandler