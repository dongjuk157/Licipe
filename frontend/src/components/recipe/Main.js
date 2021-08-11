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
  padding: 50px;
  border: solid;
  border-radius: 0.5rem;
  margin-top: 64px;
  margin-bottom: 80px;
`
const RecipeImage = styled.img`
  height: 500px;
`


const Main = () => {
  const [foodList, setFoodList] = useState([]);
  const getFoodList = () => {
    axios.get('/main')
    .then((res) => {
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
        <Carousel>
					<Slider {...settings}>
            {foodList.map((food) => {
              <RecipeImage src={`${food.imgURL}`}>
              </RecipeImage>
            })}
            <RecipeImage>
						</RecipeImage>
            <RecipeImage>
						</RecipeImage>
            <RecipeImage>
						</RecipeImage>
            
					</Slider>
        </Carousel>
        <Box display="flex">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </Box>
    </div>
  )
}

export default Main