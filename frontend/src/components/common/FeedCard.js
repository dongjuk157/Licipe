import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router';
import { Col, Card } from 'react-bootstrap';


export default function MediaCard({article}) {
  const history = useHistory()

  const onCardClick = () => {
    
    history.push({
      pathname:`/article/${article.id}`, 
      state: {
        article: article,
      },
      
    })
    // history.push(`/article/${article.ArticleID}`)
  }

  return (
    <Card 
      // className="mb-0"
      onClick={onCardClick}
    >
      <Card.Img variant="top" src={article.imgURL}/>
    </Card>
  );
}
