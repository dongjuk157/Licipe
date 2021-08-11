import React from 'react'
import SearchAppBar from '../common/SearchAppBar'
import styled from 'styled-components'

const MyPageContainer = styled.div`
  padding: 1rem;
`

const MyClips = () => {
  return (
    <>
      <SearchAppBar />
      <MyPageContainer>
        <h1>MyClips</h1>
      </MyPageContainer>
    </>
  )
}

export default MyClips