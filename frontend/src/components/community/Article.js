import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import PictureInput from './PictureInput'
import axios from 'axios'

const Article = ({history}) => {
  const [food, setFood] = useState('')
  const [content, setContent] = useState('')
  const [img, setImg] = useState('')
  const [userid, setUserId] = useState('')

  const BASE_URL = process.env.REACT_APP_API_URL
  const PORT = process.env.REACT_APP_API_PORT
  const onPost = () => {
    const config = {
      method: 'post',
      url: `${BASE_URL}:${PORT}/article`,
      data: {
        food,
        content,
        img,
        userid,
      }
    }
    axios(config)
      .then(()=> {
        history.push('/')
    }).catch((e)=>{
      console.log(e)
    })
  }
  const onSkip = () => {
    history.push('/')
  }
  return (
    <>
      <PictureInput />
      {/* <Button>사진 선택하기</Button> */}
      <input
        placeholder="음식에 대해 간략하게 평가해주세요"
      >
      </input>
      <Button
        onClick={onPost}
      >인증하기</Button>
      <Button
        onClick={onSkip}
      >인증 안 할래요</Button>
    </>
  )
}


export default Article
