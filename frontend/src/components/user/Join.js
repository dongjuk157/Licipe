import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Grid, Box } from '@material-ui/core';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {isEmail, isLength, isAlphanumeric, isStrongPassword } from 'validator';
import debounce from 'loadsh/debounce';
import storage from '../../lib/storage';


const JoinForm = styled.form`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ErrorContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: red;
`

const Join = () => {
  const { form, exists, error } = useSelector((state) => state.auth.getIn(['join'])).toJS();
  const { result } = useSelector((state) => state.auth.get('result')).toJS();
  const history = useHistory();
  const dispatch = useDispatch();
  const values = Object.assign(form);
  useEffect(() => {
    dispatch(authActions.initializeForm('join'));
  },[]);

  const setError = (name, message) => {   
    dispatch(authActions.setError({
        form: 'join',
        name,
        message
    }))
  }
  const checkEmailExists = debounce(async (email) => {
    try {
      await dispatch(authActions.checkEmailExists(email));
      if(exists['email']) {
        setError('email','이미 존재하는 이메일입니다.');
      } else {
        setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300)

  const checkUseridExists = debounce(async (username) => {
      try {
          await dispatch(authActions.checkUseridExists(username));
          if(exists['userid']) {
            setError('userid','이미 존재하는 아이디입니다.');
          } else {
            setError(null);
          }
      } catch (e) {
          console.log(e);
      }
  }, 300)
  const validate = {
    email: (value) => {
      if(!isEmail(value)) {
        setError('email', '잘못된 이메일 형식 입니다.');
        return false;
      }
      setError('email', null);
      return true;
    },
    nickname: (value) => {
      if(!isLength(value, { min:4, max: 15 })) {
        setError('nickname', '아이디는 4~15 글자로 이뤄져야 합니다.');
        return false;
      }
      setError('nickname', null);
      return true;
    },
    userid: (value) => {
      if(!isAlphanumeric(value) || !isLength(value, { min:6, max: 15 })) {
        setError('userid', '아이디는 6~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
        return false;
      }
      setError('userid', null);
      return true;
    },
    password: (value) => {
      if(!isStrongPassword(value)) {
        setError('password', '비밀번호는 8자 이상, 대소문자,숫자, 특수문자로 이뤄져야 합니다.');
        return false;
      }
      setError('password',null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    passwordConfirm: (value) => {
      if(form['password'] !== value) {
        setError('passwordConfirm', '비밀번호와 일치하지 않습니다.');
        return false;
      }
      setError('passwordConfirm', null); 
      return true;
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    dispatch(authActions.changeInput({
      name,
      value,
      form: 'join'
    }));

    // 검증작업
    const validation = validate[name](value);
    if (name.indexOf('password')>-1 || !validation)
      return;

    // 이메일, userid 확인
    // 중복확인 버튼으로 만들어도 될듯
    const check = (name === 'email') ? checkEmailExists : checkUseridExists;
    check(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const {userid, nickname, email, password, passwordConfirm} = form;
    // 에러, 유효성 검사 확인
    if (error.userid || error.nickname || error.email || error.password || error.passwordConfirm) 
      return;
    if(!validate['userid'](userid) || !validate['nickname'](nickname) || !validate['email'](email) || 
    !validate['password'](password) || !validate['passwordConfirm'](passwordConfirm))
      return;
    
    
    try {
      // 회원가입
      await dispatch(authActions.emailJoin({
        email, userid, password
      }));
      const loggedInfo = Object.assign(result);
      
      // 로그인 정보 저장 (로컬스토리지/스토어)
      storage.set('loggedInfo', loggedInfo);
      dispatch(userActions.setLoggedInfo(loggedInfo));
      dispatch(userActions.setValidated(true));

      history.push('/'); // 회원가입 성공시 홈페이지로 이동
    } catch(e) {
      // 에러 처리하기
      if(e.response.status === 409) {
        const { key } = e.response.data;
        const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
        return this.setError(message);
      }
      this.setError('알 수 없는 에러가 발생했습니다.')
    }
    
  }

  

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>JOIN</h1>
      <JoinForm onSubmit={onSubmit}>
        <label htmlFor="userid">
          <p>UserID</p>
          <input 
            placeholder="ID를 입력하세요"
            name="userid"
            value={values.userid}
            onChange={handleChange}
            required
          ></input>
        </label>
        { error.userid && <ErrorContainer>{error.userid}</ErrorContainer>}
        <label htmlFor="nickname">
          <p>NickName</p>
          <input 
            placeholder="닉네임을 입력하세요"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            required
          ></input>
        </label>
        { error.nickname && <ErrorContainer>{error.nickname}</ErrorContainer>}
        <label htmlFor="email">
        <p>Email</p>
          <input 
            type="email" placeholder="이메일 주소를 입력하세요"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          ></input>
        </label>
        { error.email && <ErrorContainer>{error.email}</ErrorContainer>}
        <label htmlFor="password">
        <p>Password</p>
          <input 
            type="password" placeholder="비밀번호를 입력하세요"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          ></input>
        </label>
        { error.password && <ErrorContainer>{error.password}</ErrorContainer>}
        <label htmlFor="passwordConfirm">
          <p>PasswordConfrim</p>
          <input 
            type="password" placeholder="비밀번호를 다시 입력하세요"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            required
          ></input>
        </label>
        { error.passwordConfirm && <ErrorContainer>{error.passwordConfirm}</ErrorContainer>}
        <Box mt={2}>
          <Button 
            onClick={onSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </JoinForm>
    </Grid> 
  )
}

export default Join