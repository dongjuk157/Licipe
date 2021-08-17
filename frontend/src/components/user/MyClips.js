import React, { useEffect }  from 'react'
import SearchAppBar from '../common/SearchAppBar'
import { useDispatch, useSelector } from 'react-redux'
import * as userActions from "../../redux/modules/user";
import Card2 from '../common/Card2';


const MyClips = () => {
  const dispatch = useDispatch()
  const result = useSelector((state) => state.user.get('result')).toJS()
  useEffect(()=>{
    async function getClips () {
      await dispatch(userActions.getUserClips())
    }
    getClips()
  }, [])
  const clipedList = Object.assign(result)
  return (
    <>
      <SearchAppBar />
      <div className="p-3">
        <h1>내 마음에 저장</h1>
        <div className="row">
        { clipedList.length !== 0 ? (
            clipedList.map((item, index) => {
              // console.log(element)
              return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card2 item={item} key={index}></Card2>
              </div>
              )
            })
        ) : (
          <p>좋아하는 레시피가 없어요...</p>)
        }
        </div>
      </div>
    </>
  )
}

export default MyClips
