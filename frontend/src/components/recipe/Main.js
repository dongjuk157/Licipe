import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Card from '../common/Card';
import Box from '@material-ui/core/Box';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import axios from 'axios';

const Carousel  = styled.div`
  border: solid;
  border-radius: 0.5rem;
  margin-top: 96px;
  margin-bottom: 80px;
`
const RecipeImage = styled.img`
  height: 30vh;
`


const Main = () => {
  const [foodList, setFoodList] = useState([]);
  const getFoodList = () => {
    axios.get('/main')
    .then((res) => {
      console.log(res.data)
      setFoodList(res.data)
    })
    .catch((err) => {
      console.log(err)
    });
  };

  useEffect(() => {
    getFoodList();
  }, [])
  const settings = {
    // customPaging: function(i) {
    //   return (
    //     <a>
    //       {/* 이미지 주소 axios? cloud url? */}
    //       <img></img>
    //     </a>
    //   );
    // },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <SearchAppBar></SearchAppBar>
        <Slider {...settings}>
          {foodList.map((food, index) => {
            return (
            <Carousel key={index}>
              <RecipeImage src={`${food.imgURL}`}></RecipeImage>
              <p>{food.name}</p>
            </Carousel>
            )
          })}      
        </Slider>
        <Box display="flex">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </Box>
    </div>
  )
}

export default Main