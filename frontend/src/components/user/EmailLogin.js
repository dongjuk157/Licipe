import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Button, Grid } from '@material-ui/core'
import * as authActions from '../../redux/modules/auth'
import * as userActions from '../../redux/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import storage from '../../lib/storage'



const LoginForm = styled.form`
  display:flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`

const EmailLogin = () => {
  
  const history = useHistory()
  const dispatch = useDispatch()
  const { form } = useSelector((state) => state.auth.getIn(['login'])).toJS()
  const result = useSelector((state) => state.auth.get('result'))
  // console.log(result)
  const values = Object.assign(form)
  // 초기화
  useEffect(() => {
    return () => {
      dispatch(authActions.initializeForm('login'))
    };
  }, []);

  const handleChange = (event) => {
    const {name, value} = event.target
    dispatch(authActions.changeInput({
      name,
      value,
      form: 'login'
    }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const { userid, password } = form
      await dispatch(authActions.emailLogin({userid, password}))
      const loggedInfo = Object.assign(result)

      dispatch(userActions.setLoggedInfo(loggedInfo))
      storage.set('loggedInfo', loggedInfo);
      history.push('/');

    } catch (e) {
      alert('가입된 아이디가 아니거나 비밀번호가 틀립니다.');
    }
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      // style={{ minHeight: '100vh' }}
    >
      <h1> Email Login </h1>
      <LoginForm onSubmit={onLogin}>
        <label htmlFor="email">
          Email:
          <input 
            type="email" placeholder="이메일 주소를 입력하세요"
            name="email"
            value={values.email}
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <label htmlFor="password">
          Password: 
          <input 
            type="password" placeholder="비밀번호를 입력하세요"
            name="password"
            value={values.password}
            onChange={handleChange}
          ></input>
        </label>
        <Box mt={2}>
          <Button 
            
            onClick={onLogin}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </LoginForm>
      <div>
        <Button onClick={() => history.push('/join')}>아직 회원이 아니신가요?</Button>
      </div>
    </Grid>
  )
}

export default EmailLogin
