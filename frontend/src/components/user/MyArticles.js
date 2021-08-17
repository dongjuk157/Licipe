import React, { useEffect }  from 'react'
import SearchAppBar from '../common/SearchAppBar'

import { useDispatch, useSelector } from 'react-redux'
import * as userActions from "../../redux/modules/user";
import Card2 from '../common/Card2';


const MyArticles = () => {
  const dispatch = useDispatch()
  const result = useSelector((state) => state.user.get('result')).toJS()
  useEffect(()=>{
    async function getArticles () {
      await dispatch(userActions.getUserArticles())
    }
    getArticles()
  }, [])
  const articleList = Object.assign(result)
  return (
    <>
      <SearchAppBar />
      <div className="p-3">
        <h1>전국 음식 자랑</h1>
        <div className="row">
        { articleList.length !== 0 ? (
            articleList.map((item, index) => {
              // console.log(element)
              return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card2 item={item}></Card2>
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

