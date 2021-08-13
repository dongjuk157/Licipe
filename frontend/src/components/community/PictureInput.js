import React, {useState} from 'react'
import axios from 'axios'
// import styled from 'styled-components'


const PictureInput = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  // const AWS = require('aws-sdk')
  // const fs = require('fs')
  // const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com')
  // const region = process.env.REACT_APP_NAVER_CLOUD_REGION
  // const access_key = process.env.REACT_APP_NAVER_CLOUD_ACCESS_KEY
  // const secret_key = process.env.REACT_APP_NAVER_CLOUD_SECRET_KEY
  // const bucket_name = process.env.REACT_APP_NAVER_CLOUD_BUCKET_NAME
  // const S3 = new AWS.S3({
  //   endpoint: endpoint,
  //   region: region,
  //   credentials: {
  //     accessKeyId : access_key,
  //     secretAccessKey: secret_key
  //   }
  // });
    
  // const s3api = async (file) => {
  //   let object_name = 'article/';
  //   // create folder
  //   await S3.putObject({
  //     Bucket: bucket_name,
  //     Key: object_name
  //   }).promise();

  //   object_name = file.name;

  //   // upload file
  //   await S3.putObject({
  //     Bucket: bucket_name,
  //     Key: `article/img/${object_name}`,
  //     ACL: 'public-read',
  //     // ACL을 지우면 전체공개가 되지 않습니다.
  //     Body: file,
  //   }).promise();
  // }

  const imgUpload = async (event) => {
    // console.log(event.target.files[0])
    const file = event.target.files[0]
    setSelectedFile(file)
    
    // cors error 해결하지 못함
    // s3api(file)
    // .then((res) => {
    //     console.log(res)
    // }).catch((e) => {
    //     console.log(e)
    // })
    const formData = new FormData()
    formData.append('img', file)
    console.log(formData)
    const config = {
      method: 'post',
      body: formData,
    }
    axios(config)
      .then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e)
    })

      
  }

  return (
    <>
      <img src={selectedFile}/>
      <input type='file' 
        accept='image/*' 
        name='img' 
        onChange={imgUpload}
        id="fileInput"
      >
      </input>
    </>

  )
}


export default PictureInput