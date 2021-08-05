import { Button } from '@material-ui/core'
import React, { useRef, useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import * as articleActions from "../../redux/modules/article";
import storage from '../../lib/storage';

const ImgContainer = styled.div`
  width: 300px;
`
const InputContent = styled.input`
  width: 300px;
`


const Article = () => {
  // useEffect(,[])
  const history = useHistory()
  const dispatch = useDispatch()
  const { userid, food, content, img } = useSelector((state) => state.article.getIn(['article', 'data'])).toJS()
  const postSuccess = useSelector((state) => state.article.get('postSuccess'))
  const currentUserInfo = storage.get('loggedInfo'); // 로그인 정보
  // if (!currentUserInfo) {
  //   history.push('/login')
  // }
  // useEffect(()=>{
  //   dispatch(articleActions.changeInput({
  //     name: 'userid',
  //     value: currentUserInfo.userid
  //   }))
  //   //food 어디서 받아와야하지?
  // },[])

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
    formData.append('img', file)
    formData.append('userid', userid)

    await dispatch(articleActions.uploadImage(formData))

  }

  const onPost = async (event) => {
    event.preventDefault()
    // 게시글 업로드
    const formData = new FormData()
    formData.append('userid', userid)
    formData.append('food', food)
    formData.append('content', content)
    formData.append('img', img)
    
    await dispatch(articleActions.uploadArticle(formData))
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
