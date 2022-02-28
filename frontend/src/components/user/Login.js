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
          <Button disabled>
            Google
          </Button>
          <Button  disabled>
            Naver
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
