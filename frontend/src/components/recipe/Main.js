import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import '../../style/main.css';
import { Link } from 'react-router-dom';

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
        <ul style={{ 
          margin: "auto", paddingLeft: "0px", paddingBottom: "10px"
          }}> 
        {dots} 
        </ul>
      </div>
    ),
    fade: true,
  };

  return (
    <CSSTransition classNames='fade' timeout={500}>
      <div className="mx-auto w-100 bg-white h-100">
        <SearchAppBar></SearchAppBar>
        <div className="col-12 col-lg-8 mx-auto bg-white align-items-center">
            <Slider {...settings}>
              {foodList.map((food, index) => {
                return (
                  <div key={index} 
                    className="d-flex flex-column align-items-center vertical">
                    <img src={`${food.imgURL}`} 
                      className="w-100 mb-3"
                      alt="음식 사진"
                      >
                    </img>
                      <Link to={`/recipe/${food.id}/step`} 
                        className="mt-3 btn btn-lg p-3">
                          <span className="gradient-underline-title fs-3 fbtn">{food.name}</span>
                      </Link>
                      <Link to={`/recipe/${food.id}/step`}>
                        <i className="fas fa-utensils" 
                          style={{ fontSize:'2rem', color:'#ff4a6b' }}>
                        </i>
                      </Link>
                  </div>
                )
              })}      
            </Slider>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Main