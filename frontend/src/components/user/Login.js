import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
// import axios from 'axios'


const LoginForm  = styled.div`
  padding: 1rem;
  border: solid;
  border-radius: 0.5rem;
  
`

const onLogin = () => {
  alert("login! 아직 통신 구현 안했다~~~~")
  //ajax 통신 구현해야함
  // axios.post()
}

const Login = () => {
  return (
    <LoginForm>
      <h1>LOGIN</h1>
      <form>
        <div>
          <p>Email</p>
          <input type="email" placeholder="이메일 주소를 입력하세요"></input>
        </div>
        <div>
          <p>Password</p>
          <input type="password" placeholder="비밀번호를 입력하세요"></input>
        </div>
          <Box mt={2}>
            <Button 
              onClick={onLogin}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
      </form>
    </LoginForm>
  )
}

export default Login