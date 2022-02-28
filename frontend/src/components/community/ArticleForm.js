import React, { useRef, useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import * as articleActions from "../../redux/modules/article";
import storage from '../../lib/storage';
import SearchAppBar from '../common/SearchAppBar'
import '../../style/articleform.css';


const Article = () => {
  // useEffect(,[])
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const getFoodId = {};
  try{
    getFoodId['foodid'] = location.state.foodid
  }  catch {
    alert('잘못된 접근입니다.')
    history.push('/')
  }
  const {foodid} = getFoodId

  const { userid, food, content, imgURL, articleid } = useSelector((state) => state.article.getIn(['article', 'data'])).toJS();
  const postSuccess = useSelector((state) => state.article.get('postSuccess'));
  const currentUserInfo = storage.get('loggedInfo'); // 로그인 정보
  
  if (!currentUserInfo) {
    alert('로그인정보가 만료되었습니다.');
    history.push('/login');
  }

  let article = null
  try {
    article = location.state.article;

  } catch (e) {
    article = null;
  }

  useEffect(()=>{
    if (!currentUserInfo) {
      return;
    }
    dispatch(articleActions.initializeForm('article'));
    if (article){ // edit으로 넘어온 경우
      dispatch(articleActions.getArticle(article.id));
    }
    else {
      dispatch(articleActions.changeInput({
        name: 'userid',
        value: currentUserInfo.userid
      }))
      // foodid는 state값으로 받아옴
      dispatch(articleActions.changeInput({
        name: 'food',
        value: {id:foodid},
      }))
    }
  },[])

  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  const handleChange = (event) =>{
    const { name, value } = event.target;
    dispatch(articleActions.changeInput({name, value}));
  }

  const handleImageButtonClick = (event) => {
    event.preventDefault();
    fileRef.current.click();
  }

  const handleSelect = async (event) => {
    event.preventDefault();
    // 사진 미리보기
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      setSelectedFile(event.currentTarget.result);
    }
    
    // 사진 업로드
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid', userid);
    await dispatch(articleActions.uploadS3(formData));

  }

  const onPost = async (event) => {
    event.preventDefault()
    // 게시글 업로드
    const data = {
      member: {id:userid},
      food,
      content,
      imgURL,
    }
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element === null || element === ''){
          alert('모든 내용을 채워주세요');
          return
        }

      }
    }

    if (article) {
      await dispatch(articleActions.editArticle(data, articleid));
    }
    else {
      await dispatch(articleActions.uploadArticle(data));
    }
    if (article){
      history.push(`/article/${article.id}`);
    } else {
      history.push('/community');
    }
  }
  const onSkip = () => {
    history.push('/');
  }
  
  return (
    <>
      <SearchAppBar></SearchAppBar>
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center col-12 col-lg-6 p-3 mx-auto"> 
          <Button 
            className="p-3" 
            variant="outline-primary" 
            size="lg" 
            onClick= {handleImageButtonClick}
            >
              사진 촬영/선택
          </Button>
          { selectedFile || imgURL ? (
            <img 
              src={selectedFile || imgURL}
              alt="selectedFileImage"
              className="w-100 "
            />
            ) : (<></>)
          }
          <form 
            id="imgForm"
            encType="multipart/form-data"
          >
            <input 
              hidden
              type='file' 
              accept='image/*'
              capture='camera' 
              name='img' 
              onChange={handleSelect}
              id="fileInput"
              ref = {fileRef}
            >
            </input>
          </form>
        </div>
        <div className="col-12 col-lg-8 p-3">
          <form className="d-flex flex-column justify-content-center align-items-center">
            <input
              value={content}
              placeholder="이번 요리 경험은 어떠셨나요? :)"
              name="content"
              onChange={handleChange}
              className="form-control w-100 m-2"
            >
            </input>
            <br/>
            <div className="p-3">
              <ButtonGroup>
                <Button
                  className="col-6"
                  size="lg"
                  onClick={onPost}
                  >{article ? "수정" :"업로드 하기"}</Button>
                <Button 
                  className="col-6"
                  variant="outline-primary"
                  size="lg"
                  onClick={onSkip}
                  >{article ? "취소" : "다음에 하기"}</Button>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export default Article
