import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

// jj
import '../../style/main.css';
import { Link } from 'react-router-dom';

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
  // window.addEventListener('DOMContentLoaded', () => {
  //   let active = document.querySelector('.slick-active')
  //   let observer = new window.MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       mutation.addedNodes.forEach((node) => {
  //         console.log(node)
  //       })
  //     })
  //   })
  //   let active = document.getElementsByClassName('slick-active')
  //   observer.observe(active, {attributes: true, attributeFilter: ['style']})
  // })


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
    <div className="mx-auto w-100 bg-white h-100">
      <SearchAppBar></SearchAppBar>
      <div className="col-12 col-lg-8 mx-auto bg-white align-items-center">
          <Slider {...settings}>
            {foodList.map((food, index) => {
              return (
                <div key={index} 
                  className="d-flex flex-column align-items-center vertical">
                  <img src={`${food.imgURL}`} 
                    className="w-100 mb-3">
                  </img>
                    <Link to={`/recipe/${food.id}/step`} 
                      className="mt-3 btn btn-lg p-3">
                      {/* 각각의 요리 레시피로 이동하는거 해주세요! */}
                        <span className="gradient-underline-title fs-3">{food.name}</span>
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
  )
}

export default Main