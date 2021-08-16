import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import * as articleActions from "../../redux/modules/article";
import storage from '../../lib/storage';

const ArticleContainer = styled.div`
  padding: 1em;
  column-count: 2;
  column-gap: 1em;
  
  @media all and (max-width: 767px) {
    column-count: 1;
    column-gap: 0.2em;
  }
`
const ImageContainer = styled.div`
  width: 50 vw;
  @media all and (max-width: 767px) {
    width: 100 vw;
    
  }
`

const ArticleDetail = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const { userid, food, content, imgURL, articleid } = useSelector((state) => state.article.getIn(['article', 'data'])).toJS()
  const currentUserInfo = storage.get('loggedInfo'); // 로그인 정보
  
  const article = location.state.article
  useEffect(()=>{
    dispatch(articleActions.getArticle(article.id))
    return dispatch(articleActions.initializeForm('article'))
  }, [])

  
  const handleThumbup = () => {
    // 좋아요 안만들겠지?
  }
  const handleEdit = () => {
    if (Number(currentUserInfo.userid) !== userid.id) {
      alert('잘못된 접근입니다.')
      return
    }
    history.push({
      pathname:`/article/`, 
      state: {
        article: article,
      },
    })
  }
  const handleDelete = async () => {
    if (Number(currentUserInfo.userid) !== userid.id) {
      alert('잘못된 접근입니다.')
      return
    }
    dispatch(articleActions.deleteArticle(articleid))
    // window.location.href('/community')
    // 새로고침 안됨
    history.push('/community')
  }

  return (
    <ArticleContainer>
      <ImageContainer>
        { imgURL ? 
        (<img 
            src={imgURL}
            alt="articleImage"
            style={{
              width:"100%",
            }}
          />)
        : (<div style={{height:300, width:300}}> </div>)
        }
      </ImageContainer>
      <div>
        <p style={{display:'flex', justifyContent:'space-around'}}>
          <span>
            작성자: {userid.nickname}
          </span>
          <span>
            음식: {food.name}
          </span>
        </p>
        { content
        ? <p>{content}</p>
        : <>정말 맛있어요</>
        }
        <Button onClick={handleThumbup}>❤</Button>
      
      { Number(currentUserInfo.userid) === userid.id 
        ? (<span>
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </span>)
        : <></>
      }
      

      </div>
    </ArticleContainer>
  )
}

export default ArticleDetail