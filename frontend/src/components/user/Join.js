import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import axios from 'axios'


const JoinDiv  = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: solid;
  border-radius: 0.5rem; 
`
const JoinForm = styled.form`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Join = ({history}) => {
  const [userid, setUserId] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  
  const onJoin = () => {
    console.error("BASE_URL 설정하지 않음")
    // Ajax 통신 post 
    const BASE_URL = process.env.REACT_APP_API_URL
    const PORT = process.env.REACT_APP_API_PORT
    const config = {
      method: 'post',
      url: `${BASE_URL}:${PORT}/join`,
      data: {
        userid,
        nickname,
        email,
        password,
        passwordConfirm,
      }
    }
    console.log(config.data)
    axios(config)
      .then( res => {
      alert(`${res}/ 회원가입 성공!`)
      //modal로 구현할경우 아래를 제거하고 로그인 상태를 넘겨주면됨
      history.push('/login')
    }).catch( e => {
      console.log(e)
    })
  }

  return (
    <JoinDiv>
      <h1>JOIN</h1>
      <JoinForm onSubmit={onJoin}>
        
        <label htmlFor="userid">
          UserID:
          <input 
            placeholder="ID를 입력하세요"
            id="userid"
            value={userid}
            onChange={ e => setUserId(e.target.value)}
          ></input>
        </label>
        <br />
        <label htmlFor="nickname">
          NickName:
          <input 
            placeholder="닉네임을 입력하세요"
            id="nickname"
            value={nickname}
            onChange={ e => setNickname(e.target.value)}
          ></input>
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input 
            type="email" placeholder="이메일 주소를 입력하세요"
            id="email"
            value={email}
            onChange={ e => setEmail(e.target.value)}
          ></input>
        </label>
        <br />
        <label htmlFor="password">
          Password: 
          <input 
            type="password" placeholder="비밀번호를 입력하세요"
            id="password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
          ></input>
        </label>
        <br />
        <label htmlFor="passwordConfirm">
          PasswordConfrim: 
          <input 
            type="password" placeholder="비밀번호를 다시 입력하세요"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={ e => setPasswordConfirm(e.target.value)}
          ></input>
        </label>
        <Box mt={2}>
          <Button 
            onClick={onJoin}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </JoinForm>
    </JoinDiv> 
  )
}

export default Join