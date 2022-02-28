import React from 'react';
import SearchAppBar from '../common/SearchAppBar';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router';
import storage from '../..//lib/storage';

const MyPageContainer = styled.div`
  padding: 1rem;
`

const EditProfile = () => {
  const history = useHistory();
  const location = useLocation();
  console.log("!",location.state)
  if (!location.state){
    alert('잘못된 접근입니다.');
    history.push('/');
  }
  
  const loggedInfo = storage.get('loggedInfo'); // 로그인 정보
  // 1 로그인 확인
  if(!loggedInfo) { // 로그인 정보가 없으면 로그인페이지 전환
    alert('로그인 정보가 만료되었습니다.');
    history.push('/login');
  } ;

  // 2 유저 정보 가져오기

  // 3 변경
  return (
  <>
    <SearchAppBar />
    <MyPageContainer>
      <h1>EditProfile</h1>
    </MyPageContainer>
  </>
  )
}

export default EditProfile