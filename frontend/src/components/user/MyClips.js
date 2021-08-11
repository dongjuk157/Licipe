import React, { useEffect }  from 'react'
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from "../../redux/modules/user";

const MyPageContainer = styled.div`
  padding: 1rem;
`

const MyClips = () => {
  const dispatch = useDispatch()
  const result = useSelector((state) => state.user.get('result')).toJS()
  useEffect(()=>{
    async function getClips () {
      await dispatch(userActions.getUserClips())
    }
    getClips()
  }, [])
  const clipedList = Object.assign(result)
  return (
    <>
      <SearchAppBar />
      <MyPageContainer>
        <h1>MyClips</h1>
        <ul>
        { clipedList.length !== 0 ? (
            clipedList.map((element) => {
              // console.log(element)
              return (<li key={element.id}>
                음식: {element.food.name}
              </li>)
            })
        ) : (
          <li>스크랩한 레시피가 없어요...</li>)
        }
        </ul>
      </MyPageContainer>
    </>
  )
}

export default MyClips
