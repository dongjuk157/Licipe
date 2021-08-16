import React, { useEffect, useState } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import FeedCard from '../common/FeedCard'
import { useDispatch, useSelector } from 'react-redux'
import * as articleAction from '../../redux/modules/article'
import { Col } from 'react-bootstrap'
import Masonry from 'react-masonry-css'

const breakpointColumnsObject = {
  default: 4,
  992: 3,
  768: 2,
  576: 1,

}

const Community = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state)=> state.article.get('articles'))
  // console.log(articles, typeof(articles))
  const [count, setCount] = useState(1)
  
  useEffect(()=>{
    //처음 들어왔을때 Get 요청으로 이미지 채워넣기 
    const updateFeed = () => {
      dispatch(articleAction.getArticlesPage())
      setCount(count + 1) // infinity scroll
    }
    updateFeed()
  }, [])

  return (
    <>
      <SearchAppBar></SearchAppBar>
      <Masonry
        breakpointCols={breakpointColumnsObject}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {articles.map((article) => (
          <FeedCard 
            key={article.id}
            article={article}
          />
        ))}
      </Masonry>
    </>
  )
}

export default Community
