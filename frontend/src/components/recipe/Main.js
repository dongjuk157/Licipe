import React, { useState, useEffect } from 'react';
import SearchAppBar from '../common/SearchAppBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

// jj
import { makeStyles } from '@material-ui/core/styles';
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

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  useEffect(() => {
    getFoodList();
  }, [])
  const settings = {
    // dots true => false 이유는 76번 줄 주석
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
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

  const classes = useStyles();
  return (
    
    <div className="mx-auto w-100 pb-5 pb-lg-1 bg-white">
      <SearchAppBar></SearchAppBar>
      <div className="col-12 col-lg-8 mx-auto mt-1 bg-white">
        <div className={classes.root}>
          <Slider {...settings}>
            {foodList.map((food, index) => {
              return (
                <div key={index} className="mt-5 mt-lg-2 mx-auto d-flex flex-column align-items-center">
                  <img src={`${food.imgURL}`} className="w-100 mb-3 center" alt={food.name+'img'}>
                  </img>
                    <Link to={`/recipe/${food.id}`}>
                      <button className="btn btn-lg p-3 unique-transparent-btn">
                      {/* 각각의 요리 레시피로 이동하는거 해주세요! */}
                        <span className="gradient-underline" >{food.name}</span>
                      </button>
                    </Link>
                  {/* dot을 없애야 slider 안에서 food 변수를 사용 가능 */}
                  {/* <div className="d-grid col-8 col-md-6 mx-auto"> */}
                    <Link to={`/recipe/${food.id}/step`}>
                      <button className="btn-style">요리 시작 🤤</button>
                    </Link>
                  {/* </div> */}
                </div>
              )
            })}      
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Main