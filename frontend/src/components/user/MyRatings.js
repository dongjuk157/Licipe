import React from 'react'
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components'

const MyPageContainer = styled.div`
  padding: 1rem;
`

const MyRatings = () => {
  return (
    <>
      <SearchAppBar />
      <MyPageContainer>
        <h1>MyRatings</h1>
      </MyPageContainer>
    </>
  )
}

export default MyRatings