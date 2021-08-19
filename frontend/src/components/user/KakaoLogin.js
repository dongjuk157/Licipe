import React from 'react'
// import styled from 'styled-components'
import { Button } from '@material-ui/core'
// import { Box } from '@material-ui/core'
// import axios from 'axios'
import '../../style/social_login.css';

const KakaoLogin = () => {
  const HOST = 'kauth.kakao.com'
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI
  const URL = `https://${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  console.log(URL)
  return (
    <a className='kakao' href={URL} style={{textDecoration: 'none'}}>
      <Button className='social'>
        <img src="/images/kakao_login_large_wide.png" className='social'></img>
      </Button>
    </a>
  )
}

export default KakaoLogin