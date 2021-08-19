import React from 'react'
import { Button, Grid } from '@material-ui/core'
import KakaoLogin from './KakaoLogin'
import SearchAppBar from '../common/SearchAppBar'
import kakao_button from '../../style/icon/kakao_login_large_wide.png';
import naver_button from '../../style/icon/btnW_완성형.png';
import google_button from '../../style/icon/btn_google_signin_light_normal_web@2x.png';

const Login = ({history}) => {
  return (
    <>
      <SearchAppBar></SearchAppBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* <h1>LOGIN</h1> */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <KakaoLogin />
          
          <Button  disabled>
            <img src={naver_button} className='social'></img>
          </Button>
          <Button disabled>
            <img src={google_button} className='social'></img>
          </Button>
          <Button disabled onClick={()=>{history.push('/login/email')}}>
            Email로 로그인
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Login