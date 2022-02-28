import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as userActions from "../../redux/modules/user";

const Card2 = ({item, ratingButton}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {food, score, imgURL} = item;
  // console.log(item)
  
  const goEvaluationPage = async () => {
    await dispatch(userActions.initializeForm('result'));
    //REDUX에서 가지고 있는 값때문에 페이지 전환되자마자 에러남
    return history.push({
      pathname:`/recipe/${food.id}/evaluation`,
      state: {
        food, 
      },
    })
  }
  const goArticle = () => {
    return history.push({
      pathname:`/article/${item.id}`, 
      state: {
        article: item,
      },
    })
  }
  
  return (
    <div className="col p-2" style={{height:"100%"}}>
      <Card className="my-2 mx-0 pt-3 h-100 d-flex">
        {/* img : body = 3 : 1 */}
        
        <Card.Img variant="top" src={ratingButton?imgURL:food.imgURL} className="img-fluid"/>
        
        <Card.Body className="px-3 card-body d-flex justify-content-around align-items-center">
          <div 
            className="mb-0 pl-2 col-10 d-flex flex-column" 
          >
            <p className="mb-0">{food.name}</p>
            { score && (
              <p  className="mb-0">🌟 {score}/5</p>
            )}
          </div>
          <Button variant="outline-primary" className="col-2 p-1" onClick={()=>history.push(`/recipe/${food.id}/step`)}>
            <i className="fas fa-utensils"></i>
          </Button>
        </Card.Body>
        {ratingButton && (
          <Card.Footer className="d-flex justify-content-between">
            <span className="mb-0" onClick={goEvaluationPage} style={{cursor:"pointer"}}>평가하기</span>
            <span className="mb-0" onClick={goArticle} style={{cursor:"pointer"}}>인증 글</span>
          </Card.Footer>
        )}
      </Card>
    </div>
  )
}

export default Card2