import React from 'react'
import SearchAppBar from '../common/SearchAppBar'
import Card from '../common/Card'
import Box from '@material-ui/core/Box';

const Main = () => {
  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div style={{ height: 450 }}>Carousel</div>
      <Box display="flex">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Box>
    </div>
  )
}

export default Main