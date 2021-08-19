import React from 'react'
import { Button, Grid } from '@material-ui/core'
import KakaoLogin from './KakaoLogin'
import SearchAppBar from '../common/SearchAppBar'

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
            <img src="/images/btnW_완성형.png" className='social'></img>
          </Button>
          <Button disabled>
            <img src="/images/btn_google_signin_light_normal_web@2x.png" className='social'></img>
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