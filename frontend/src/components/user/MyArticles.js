import React, { useEffect }  from 'react';
import SearchAppBar from '../common/SearchAppBar';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from "../../redux/modules/user";
import Card2 from '../common/Card2';
import { useLocation } from 'react-router';


const MyArticles = ({match}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const result = useSelector((state) => state.user.get('result')).toJS()
  const myArticles = useSelector((state) => state.user.getIn(['articles', 'articles'])).toJS();
  useEffect(()=>{
    dispatch(userActions.initializeForm('result'));
    async function getArticles () {
      await dispatch(userActions.getUserArticles());
    }
    getArticles();
    return dispatch(userActions.initializeForm('articles'));
  }, [match.params.url]);
  let ratingButton = false;
  try {
    ratingButton = location.state.ratingButton;
  } catch (e) {}
  const articleList = Object.assign(myArticles);
  return (
    <>
      <SearchAppBar />
      <div className="p-3">
        <h1>전국 음식 자랑</h1>
        <div className="row">
        { articleList.length !== 0 ? (
            articleList.map((item, index) => {
              return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card2 item={item} ratingButton={ratingButton}></Card2>
              </div>
              )
            })
        ) : (
          <p>자랑한 글이 없어요...</p>)
        }
        </div>
      </div>
    </>
  )
}

export default MyArticles

