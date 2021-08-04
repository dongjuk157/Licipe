import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router';

const maxWidth  = 345
const useStyles = makeStyles({
  root: {
    maxWidth: maxWidth,
    margin: '1rem',
  },
  media: {
    backgroundColor: 'lightgray',
    // padding: '1rem',
  },
});

export default function MediaCard({article}) {
  const classes = useStyles()
  const history = useHistory()
  // height 변경 필요함
  const height = 300
  // console.log(rate, height, width)
  // 실제 사진 데이터를 얻어오는 경우 cardMedia의 image 주소를 바꿀것
  // 그리고 이미지 사이즈가 매우 크므로 이미지 리사이징 해서 가져올것(속도가 매우 느려짐)

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
      className={classes.root}
      onClick={onCardClick}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={article.download_url}
          // image={article.Img}
          style={{
            height: height,
            objectFit: 'cover'
          }}
        />
      </CardActionArea>
    </Card>
  );
}
