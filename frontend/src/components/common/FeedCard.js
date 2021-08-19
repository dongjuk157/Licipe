import React from 'react';
import { useHistory } from 'react-router';
import { Card } from 'react-bootstrap';


export default function MediaCard({article}) {
  const history = useHistory();

  const onCardClick = () => {
    history.push({
      pathname:`/article/${article.id}`, 
      state: {
        article: article,
      },
    });
  };

  return (
    <Card 
      onClick={onCardClick}
    >
      <Card.Img variant="top" src={article.imgURL}/>
    </Card>
  );
}
