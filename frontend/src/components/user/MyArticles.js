import React from 'react'
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components'

const MyPageContainer = styled.div`
  padding: 1rem;
`

const MyArticles = () => {
  return (
    <>
      <SearchAppBar />
      <MyPageContainer>
        <h1>MyArticles</h1>
      </MyPageContainer>
    </>
  )
}

export default MyArticles