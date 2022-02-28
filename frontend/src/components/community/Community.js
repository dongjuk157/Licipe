import React, { useEffect, useState } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import FeedCard from '../common/FeedCard';
import { useDispatch, useSelector } from 'react-redux';
import * as articleAction from '../../redux/modules/article';
import Masonry from 'react-masonry-css';
import '../../style/community.css';

const breakpointColumnsObject = {
  default: 4,
  992: 3,
  768: 2,
  576: 1,

}

const Community = ({match}) => {
  const dispatch = useDispatch()
  const articles = useSelector((state)=> state.article.get('articles'))
  const [count, setCount] = useState(1)
  
  useEffect(()=>{
    //처음 들어왔을때 Get 요청으로 이미지 채워넣기 
    const updateFeed = () => {
      dispatch(articleAction.getArticlesPage())
      setCount(count + 1) // infinity scroll
    }
    updateFeed()
  }, [match.params.url])

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
            className="feedcard"
            key={article.id}
            article={article}
          />
        ))}
      </Masonry>
    </>
  )
}

export default Community
