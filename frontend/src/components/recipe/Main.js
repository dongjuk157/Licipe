import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

// jj
import '../../style/main.css';
import { Link } from 'react-router-dom';

import { Button, Carousel, ButtonGroup, Row, Col, Container, Card } from 'react-bootstrap';

const Main = () => {
  const [foodList, setFoodList] = useState([]);
  const [nowFood, setNowFood] = useState(0);
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
    // dots true => false 이유는 76번 줄 주석
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    appendDots: dots => (
      <div
        style={{
          position: 'relative',
          borderRadius: "10px",
          paddingBottom: "10px"
        }}
      >
        <ul style={{ margin: "auto", paddingLeft: "0px", paddingBottom: "10px"}}> {dots} </ul>
      </div>
    ),
    fade: true,
  };

  return (
    
    <div class="mx-auto w-100 bg-white h-100">
      <SearchAppBar></SearchAppBar>
      <Carousel className="col-12 col-lg-8 mx-auto bg-white align-items-center">
        {foodList.map((food, index) => {
          return (
            <Carousel.Item interval={1000} key={index}>
              <img
                className="d-block w-100"
                src={`${food.imgURL}`}
                alt="First slide"
              />
              <Carousel.Caption>
                <Link to={`/recipe/${food.id}`} className="mt-3 btn btn-lg p-3">
                  {/* 각각의 요리 레시피로 이동하는거 해주세요! */}
                    <span className="gradient-underline-title" >{food.name}</span>
                </Link>
                <Link to={`/recipe/${food.id}/step`}>
                  <i class="fas fa-utensils" style={{ fontSize:'2rem' }}></i>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        </Carousel>
    
    </div>
  )
}

export default Main