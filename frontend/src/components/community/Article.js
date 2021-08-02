import { Button } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import styled from 'styled-components'

const ImgContainer = styled.div`
  width: 300px;
`
const InputContent = styled.input`
  width: 300px;
`


const Article = ({history}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [img, setImg] = useState('')
  const [content, setContent] = useState('')
  const food = ''
  const userid = ''
  const fileRef = useRef()

  const BASE_URL = process.env.REACT_APP_API_URL
  const PORT = process.env.REACT_APP_API_PORT

  const handleImageButtonClick = (event) => {
    event.preventDefault()
    fileRef.current.click()
  }

  const handleUpload = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    // if (!file) {
    //   //파일을 선택하지 않는 경우
    //   alert('힝')
    //   return
    // }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (event) => {
      setSelectedFile(event.currentTarget.result)
    }
    
    const formData = new FormData()
    formData.append('img', file)
    // for (var key of formData.keys()) {
    //   console.log(key);
    // }
    
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    const config = {
      method: 'post',
      url: `${BASE_URL}:${PORT}/articles/image`,
      body: formData,
    }
    axios(config)
      .then(res => {
      // 이미지 주소 리턴
      setImg(res.data.imgUrl)
    }).catch(e => {
      console.log(e)
    })
  }
  const onPost = (event) => {
    event.preventDefault()
    const config = {
      method: 'post',
      url: `${BASE_URL}:${PORT}/article`,
      data: {
        userid,
        food,
        content,
        img,
      }
    }
    axios(config)
      .then(()=> {
        history.push('/community')
    }).catch((e)=>{
      console.log(e)
    })
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
                'object-fit': 'contain',
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
            onChange={handleUpload}
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
            onChange={(event)=>{
              setContent(event.target.value)
            }}
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
