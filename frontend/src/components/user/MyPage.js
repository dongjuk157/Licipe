import { Button } from 'react-bootstrap'
import React, { useEffect } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { useHistory } from 'react-router'
import storage from '../..//lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from "../../redux/modules/user";
import Card2 from '../common/Card2'

const MyPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedInfo = storage.get('loggedInfo'); // 로그인 정보
  const result = useSelector((state) => state.user.get('result')).toJS()
  
  useEffect(()=>{
    if(!loggedInfo) {
      return
    } 
    async function getRatings () {
      await dispatch(userActions.getUserRatingsRecent())
    }
    getRatings()
  }, [])

  if(!loggedInfo) { // 로그인 정보가 없으면 로그인페이지 전환
    alert('로그인 정보가 만료되었습니다.')
    history.push('/login')
    return
  } 

  const ratingList = Object.assign(result)
  
  // /member/ratings/recent

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
      <div className="p-3">
        <div className="d-flex flex-column p-2">
          <Button variant="dark" 
            onClick={editUserProfile} disabled
            className="m-1"
          >유저 정보 관리</Button>
          <Button variant="dark" 
            onClick={postedArticle}
            className="m-1"
          >인증한 글</Button>
          <Button variant="dark"
            onClick={evaluatedRecipe}
            className="m-1"
          >평가한 요리</Button>
        
        </div>
        <div className="d-flex flex-column p-2">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="d-inline"> 스크랩한 레시피</h3>
            <span onClick={scrapedRecipe} style={{cursor:"pointer"}} className="mb-0">전체보기</span>
          </div>
          <div className="row">
            {  ratingList.length !== 0 ? (
              ratingList.map((item, index)=>{
                return (
                  // 슬라이더 있으면 좋을듯
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Card2 item={item} key={index}></Card2>
                  </div>
                )
              })
            ) : (
              <p>스크랩한 레시피가 없어요...</p>
            )}
          </div>
        </div> 
      </div>
    </>
  )
}

export default MyPage