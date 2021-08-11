import React, { useEffect, useState } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import axios from 'axios'
import FeedCard from '../common/FeedCard'
import styled from 'styled-components'
const FeedContainer = styled.div`
  column-count: 5;
  column-gap: 1em;
  @media all and (min-width: 1200px) and (max-width: 1399px) {
    column-count: 4;
    column-gap: 0.7em;
  }
  @media all and (min-width: 768px) and (max-width: 1199px) {
    column-count: 3;
    column-gap: 0.5em;
  }
  @media all and (max-width: 767px) {
    column-count: 2;
    column-gap: 0.2em;
  }
`
const Community = () => {
  const BASE_URL = process.env.REACT_APP_API_URL
  const PORT = process.env.REACT_APP_API_PORT
  
  const [feeds, setFeeds] = useState([])
  
  const [count, setCount] = useState(1)
  const updateFeed = () => {
    const config = {
      method: 'get',
      url: `${BASE_URL}:${PORT}/articles`,
      // url: `https://picsum.photos/v2/list?page=${count}&limit=10`, // test용도
    }
    setCount(count + 1) // infinity scroll
    axios(config)
      .then(res => {
        const newFeeds = [...feeds, ...res.data]
        setFeeds(newFeeds)
        console.log(newFeeds)
    }).catch(error => {
      console.log(error)
    })
  }
  useEffect(()=>{
    //처음 들어왔을때 Get 요청으로 이미지 채워넣기
    updateFeed()
  }, [])
  // useEffect(() => {
  //   // 피드 업데이트마다 할 동작
  //   console.log(feeds)
  // }, [feeds])

  return (
    <>
      <SearchAppBar></SearchAppBar>
      <div style={{height:"100px"}}></div>
      {/* <Button onClick={updateFeed}>업데이트 피드</Button> */}
      <FeedContainer>
        {feeds.map((article) => (
          <FeedCard 
            key={article.id}
            article={article}
          />
        ))}
      </FeedContainer>
    </>
  )
}

export default Community
