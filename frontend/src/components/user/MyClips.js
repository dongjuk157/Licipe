import React, { useEffect }  from 'react';
import SearchAppBar from '../common/SearchAppBar';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from "../../redux/modules/user";
import Card2 from '../common/Card2';


const MyClips = ({match}) => {
  const dispatch = useDispatch();
  // const result = useSelector((state) => state.user.get('result')).toJS()
  const myClips = useSelector((state) => state.user.getIn(['articles', 'clips'])).toJS();
  useEffect(()=>{
    async function getClips () {
      await dispatch(userActions.getUserClips());
    }
    getClips();
    return dispatch(userActions.initializeForm('articles'));
  }, [match.params.url]);
  const clipedList = Object.assign(myClips);
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
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card2 item={item}></Card2>
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
