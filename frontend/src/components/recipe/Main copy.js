import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

// jj
import '../../style/main.css';
import { Link } from 'react-router-dom';

import { Button, ButtonGroup, Row, Col, Container, Card } from 'react-bootstrap';

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
      <Row class="col-12 col-lg-8 mx-auto bg-white align-items-center">
          <Slider {...settings}>
            {foodList.map((food, index) => {
              return (
                <div key={index} className="d-flex flex-column align-items-center">
                  <img src={`${food.imgURL}`} className="w-100 mb-3">
                  </img>
                    <Link to={`/recipe/${food.id}`} className="mt-3 btn btn-lg p-3">
                      {/* 각각의 요리 레시피로 이동하는거 해주세요! */}
                        <span className="gradient-underline-title" >{food.name}</span>
                    </Link>
                  {/* dot을 없애야 slider 안에서 food 변수를 사용 가능 */}
                  {/* <div class="d-grid col-8 col-md-6 mx-auto"> */}
                    <Link to={`/recipe/${food.id}/step`}>
                      <i class="fas fa-utensils" style={{ fontSize:'2rem' }}></i>
                    </Link>
                  {/* </div> */}
                </div>
              )
            })}      
          </Slider>
      </Row>
    </div>
  )
}

export default Main