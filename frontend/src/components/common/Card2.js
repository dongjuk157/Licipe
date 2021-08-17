import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Card2 = ({item}) => {
  const history = useHistory()
  const {food, score} = item
  // console.log(score)
  return (
    <div className="col">
      <Card className="my-2 mx-0 pt-3">
        <Card.Img variant="top" src={food.imgURL} className="img-fluid"/>
        <Card.Body className="px-3 card-body d-flex justify-content-around align-items-center">
          <Card.Text 
            className="mb-0 pl-2 col-10 d-flex flex-column" 
          >
            <p>{food.name}</p>
            { score && (
              <p>{score}/5</p>
            )}
          </Card.Text>
          <Button variant="outline-primary" className="col-2 p-1" onClick={()=>history.push(`/recipe/${food.id}/step`)}>
            <i className="fas fa-utensils"></i>
          </Button>
          
        </Card.Body>
        
      </Card>
    </div>
  )
}

export default Card2