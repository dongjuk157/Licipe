import React from 'react'
import { Button, Grid } from '@material-ui/core'
import KakaoLogin from './KakaoLogin'



const Login = ({history}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>LOGIN</h1>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <KakaoLogin />
        <Button>
          Google
        </Button>
        <Button>
          Naver
        </Button>
        <Button onClick={()=>{history.push('/login/email')}}>
          Email로 로그인
        </Button>
      </Grid>
    </Grid>
  )
}

export default Login