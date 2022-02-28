import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import * as articleActions from "../../redux/modules/article";
import storage from '../../lib/storage';
import SearchAppBar from '../common/SearchAppBar';

const ArticleDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userid, food, content, imgURL, articleid } = useSelector((state) => state.article.getIn(['article', 'data'])).toJS();
  const currentUserInfo = storage.get('loggedInfo'); // 로그인 정보


  const article = location.state.article
  useEffect(()=>{
    dispatch(articleActions.getArticle(article.id));
    return dispatch(articleActions.initializeForm('article'));
  }, [])

  if (!currentUserInfo) {
    alert('로그인정보가 만료되었습니다.');
    history.push('/login');
    return <></> 
  }
  
  const handleEdit = () => {
    if (Number(currentUserInfo.userid) !== userid.id) {
      alert('잘못된 접근입니다.');
      return;
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
      alert('잘못된 접근입니다.');
      return;
    }
    dispatch(articleActions.deleteArticle(articleid));
    // window.location.href('/community')
    // 새로고침 안됨
    history.push('/community');
  }

  return (
    <>
    <SearchAppBar></SearchAppBar>
    <div className="container col-10 mt-lg-5 d-flex flex-wrap position-relative">
      <div className="col-12 col-lg-6 p-3">
        { imgURL ? 
        (<img 
            src={imgURL}
            alt="articleImage"
            className="w-100"
          />)
        : (<div style={{height:300, width:300, backgroundColor:'gray'}}> </div>)
        }
      </div>
      <div className="col-12 col-lg-6 p-3">
        <div className="d-flex justify-content-start align-items-center fs-5 p-3">
          <span className="me-2">
            {userid.nickname}님의
          </span>
          <span style={{ color: '#ff4a6b'}}>
            {food.name}
          </span>
        </div>
        <div className="p-3">
          { content && (<p className="w-100">{content}</p>)
          }
        </div>
        { Number(currentUserInfo.userid) === userid.id 
          && (
          <div className="d-flex justify-content-end position-absolute bottom-0 end-0 p-3">
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </div>
        )}
      

      </div>
    </div>
    </>
  )
}

export default ArticleDetail