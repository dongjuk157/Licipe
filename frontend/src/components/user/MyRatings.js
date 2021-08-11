import React, { useEffect } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from "../../redux/modules/user";

const MyPageContainer = styled.div`
  padding: 1rem;
`

const MyRatings = () => {
  const dispatch = useDispatch()
  const result = useSelector((state) => state.user.get('result')).toJS()
  useEffect(()=>{
    async function getRatings () {
      await dispatch(userActions.getUserRatings())
    }
    getRatings()
  }, [])
  const ratingList = Object.assign(result)
  
  
  return (
    <>
      <SearchAppBar />
      <MyPageContainer>
        <h1>MyRatings</h1>
        <ul>
        { ratingList.length !== 0 ? (
            ratingList.map((element) => {
              // console.log(element)
              return (<li key={element.id}>
                음식: {element.food.name} | 점수: {element.score} | 
              </li>)
            })
        ) : (
          <li>평가한 레시피가 없어요...</li>)
        }
        </ul>
      </MyPageContainer>
    </>
  )
}

export default MyRatings