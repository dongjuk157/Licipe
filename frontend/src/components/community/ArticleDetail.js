import { Button, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

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

const ArticleDetail = ({location}) => {
  const [image, setImage] = useState('')
  const [comment, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [food, setFood] = useState('')
  
  const BASE_URL = process.env.REACT_APP_API_URL
  const PORT = process.env.REACT_APP_API_PORT
  const articleId = new URL(window.location.href).pathname.split('/article/')[1] // string
  
  const getArticle = () =>{
    const config = {
      method: 'get',
      url: `${BASE_URL}:${PORT}/article/${articleId}`,
      // url: location.state.article.download_url,
    }
    console.log(config)
    axios(config)
    .then(res => {
      // console.log(res.data)
      setImage(res.data.img)
      setContent(res.data.content)
      setFood(res.data.food)
      setAuthor(res.data.userid)
    }).catch(e => {
      console.log(e)
    }) 
    // setImage(location.state.article.download_url)
  }
    
  useEffect(()=>{
    getArticle()
    // console.log(image)
  }, [])
  return (
    <ArticleContainer>
      <ImageContainer>
        { image 
        ? <img 
            src={image}
            alt="articleImage"
            style={{
              width:"100%",
            }}
          />
        : <div style={{height:300, width:300}}> </div>
        }
      </ImageContainer>
      <div>
        <p style={{display:'flex', justifyContent:'space-around'}}>
          <span>
            작성자: {author}
          </span>
          <span>
            음식: {food}
          </span>
        </p>
        { comment
        ? <p>{comment}</p>
        : <>정말 맛있어요</>
        }
        <Button>❤</Button>
      </div>
    </ArticleContainer>
  )
}

export default ArticleDetail