import React, { useRef, useState, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import * as articleActions from "../../redux/modules/article";
import storage from '../../lib/storage';
import { get } from 'immutable'

const ImgContainer = styled.div`
  width: 300px;
`
const InputContent = styled.input`
  width: 300px;
`


const Article = () => {
  // useEffect(,[])
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const getFoodId = {}
  try{
    getFoodId['foodid'] = location.state.foodid
  }  catch {
    alert('잘못된 접근입니다.')
    history.push('/')
  }
  const {foodid} = getFoodId

  const { userid, food, content, img, articleid } = useSelector((state) => state.article.getIn(['article', 'data'])).toJS()
  const postSuccess = useSelector((state) => state.article.get('postSuccess'))
  const currentUserInfo = storage.get('loggedInfo'); // 로그인 정보
  let article = null
  try {
    article = location.state.article
  } catch (e) {
    article = null
  }
  
  if (!currentUserInfo) {
    history.push('/login')
  }
  useEffect(()=>{
    dispatch(articleActions.initializeForm('article'))
    if (article){ // edit으로 넘어온 경우
      dispatch(articleActions.getArticle(article.id))
    }
    else {
      dispatch(articleActions.changeInput({
        name: 'userid',
        value: currentUserInfo.userid
      }))
      // foodid는 state값으로 받아옴
      dispatch(articleActions.changeInput({
        name: 'food',
        value: foodid,
      }))
    }
    
  },[])

  const [selectedFile, setSelectedFile] = useState(null)
  const fileRef = useRef()

  const handleChange = (event) =>{
    const { name, value } = event.target
    dispatch(articleActions.changeInput({name, value}))
  }

  const handleImageButtonClick = (event) => {
    event.preventDefault()
    fileRef.current.click()
  }

  const handleSelect = async (event) => {
    event.preventDefault()
    // 사진 미리보기
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (event) => {
      setSelectedFile(event.currentTarget.result)
    }
    
    // 사진 업로드
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userid', userid) //필요한가?
    await dispatch(articleActions.uploadS3(formData))

  }

  const onPost = async (event) => {
    event.preventDefault()
    // 게시글 업로드
    // const formData = new FormData()
    // formData.append('userid', userid)
    // formData.append('food', food)
    // formData.append('content', content)
    // formData.append('img', img)
    const data = {
      member: userid,
      food,
      content,
      imgURL: img,
    }
    if (article) {
      await dispatch(articleActions.editArticle(data, articleid))
    }
    else {
      await dispatch(articleActions.uploadArticle(data))
    }
    if (postSuccess)
      history.push('/community')
  }
  const onSkip = () => {
    history.push('/')
  }
  return (
    <Grid
      container
      spacing={10}
      // direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid 
        item
      > 
        <ImgContainer>
          { selectedFile 
            ?
            <img 
              src={selectedFile}
              alt="selectedFileImage"
              style={{
                'objectFit': 'contain',
                width: '100%',
              }}
            />
            :
            <></>
          }
        </ImgContainer>
        <form 
          id="imgForm"
          encType="multipart/form-data"
        >
          <input 
            type='file' 
            accept='image/*'
            capture='camera' 
            name='img' 
            onChange={handleSelect}
            id="fileInput"
            hidden
            ref = {fileRef}
          >
          </input>
          <Button
            onClick= {handleImageButtonClick}
          >사진 선택</Button>
        </form>
      </Grid>
      <Grid
        item
      >
        <form>
          <InputContent
            placeholder="음식에 대해 간략하게 평가해주세요"
            name="content"
            onChange={handleChange}
          >
          </InputContent>
          <br/>
          <Button
            onClick={onPost}
          >인증하기</Button>
          <Button
            onClick={onSkip}
          >인증 안 할래요</Button>
        </form>
      </Grid>
    </Grid>
  )
}


export default Article
