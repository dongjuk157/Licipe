import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import Page from './Page';
import PropTypes from 'prop-types'

const Container = styled.View`
  height: 60%;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.View`
  margin: 0px 4px;
  background-color: ${(props) => (props.focused ? '#262626' : '#dfdfdf')};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const Carousel = ({pages, pageWidth, gap, offset}) => {
  const [page, setPage] = useState(0);

  const renderItem = ({item}) => {
    return (
      <Page item={item} style={{width: pageWidth, marginHorizontal: gap / 2}} />
    );
  }

  const onScroll = (e) => {
    const newPage =  e.nativeEvent.contentOffset.x / (pageWidth + gap)
    setPage(newPage);
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <IndicatorWrapper>
        {Array.from({length: pages.length}, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper>
    </Container>
  );
}

Carousel.propTypes = {
  gap: PropTypes.number,
  offset: PropTypes.number,
  pages: PropTypes.any,
  pageWidth: PropTypes.number,
}

export default Carousel