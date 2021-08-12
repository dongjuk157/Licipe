import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

// jj
import { makeStyles } from '@material-ui/core/styles';
import main from '../../style/main.css';

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

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  useEffect(() => {
    getFoodList();
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
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

  const classes = useStyles();
  return (
    
    <div class="mx-auto w-100 pb-5 pb-lg-1 bg-white">
      <SearchAppBar></SearchAppBar>
      <div class="col-12 col-lg-8 mx-auto mt-1 bg-white">
        <div className={classes.root}>
          <Slider {...settings}>
            {foodList.map((food, index) => {
              return (
                <div key={index} class="mt-5 mt-lg-2 mx-auto d-flex flex-column align-items-center">
                  <img src={`${food.imgURL}`} class="w-100 mb-3 center">
                  </img>
                  <p class="title-style mt-3">{food.name}</p>
                </div>
              )
            })}      
          </Slider>
          <div class="d-grid col-8 col-md-6 mx-auto">
            <button class="btn-style">요리 시작 🤤</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main