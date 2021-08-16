import { Button } from '@material-ui/core'
import React from 'react'
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router'
import storage from '../..//lib/storage';

const MyPageContainer = styled.div`
  padding: 1rem;
`
const MyButton = withStyles({
  root: {
    width: "50%",
    margin: "0.5rem",
  },
  
})(Button);
const PointingSpan = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`


const MyPage = () => {
  const history = useHistory()
  const loggedInfo = storage.get('loggedInfo'); // 로그인 정보

  if(!loggedInfo) { // 로그인 정보가 없으면 로그인페이지 전환
    alert('로그인 정보가 만료되었습니다.')
    history.push('/login')
  } 

  const editUserProfile = () => {
    history.push({
      pathname: '/editprofile',
      state:{
        userid: loggedInfo.userid,
      }
    })
  }
  const postedArticle = () => {
    history.push('/myarticles')
  }
  const evaluatedRecipe = () => {
    history.push('/myratings')
  }
  const scrapedRecipe = () => {
    history.push('/myclips')

  }
  return (
    <>
      <SearchAppBar />
      <MyPageContainer>
        <div>
          <MyButton variant="contained" onClick={editUserProfile} disabled>유저 정보 관리</MyButton>
          <MyButton variant="contained" onClick={postedArticle}>인증한 글</MyButton>
          <MyButton variant="contained" onClick={evaluatedRecipe}>평가한 요리</MyButton>
          <MyButton variant="contained" onClick={scrapedRecipe}>스크랩한 레시피</MyButton>
        </div>
        {/* 스크랩한 레시피에서 다섯개만 불러오는 REST API가 없어서 그냥 버튼으로 대체
        <div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h3 style={{display:'inline'}}> 스크랩한 레시피</h3>
            <PointingSpan onClick={scrapedRecipe}>
            전체보기
            </PointingSpan>
          </div>
          <div>
            최대 5개 보여주기
          </div>
        </div> 
        */}
      </MyPageContainer>
    </>
  )
}

export default MyPage