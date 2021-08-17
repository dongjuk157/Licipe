import React, { useEffect } from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from "../../redux/modules/user";
import Card2 from '../common/Card2';


const MyRatings = ({match}) => {
  const dispatch = useDispatch()
  const result = useSelector((state) => state.user.get('result')).toJS()
  useEffect(()=>{
    async function getRatings () {
      await dispatch(userActions.getUserRatings())
    }
    getRatings()
    return dispatch(userActions.initializeForm('result'))
  }, [match.params.url])
  const ratingList = Object.assign(result)
  // console.log(ratingList)
  
  return (
    <>
      <SearchAppBar />
      <div className="p-3">
        <h1>제 점수는요?</h1>
        <div className="row">
        { ratingList.length !== 0 ? (
            ratingList.map((item, index) => {
              return (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <Card2 item={item}></Card2>
                </div>
              )
            })
        ) : (
          <li>평가한 레시피가 없어요...</li>)
        }
        </div>
      </div>
    </>
  )
}

export default MyRatings