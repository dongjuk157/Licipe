import React from 'react';
import styled from 'styled-components/native';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types'


const Page = ({item, style}) => {
  return (
    <PageItem color={item.color} style={style}>
      <PageNum>{item.num}</PageNum>
    </PageItem>
  );
}
const PageItem = styled.View`
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const PageNum = styled.Text``;

Page.propTypes = {
  item: {
    num: PropTypes.number,
    color: PropTypes.string,
  },
  style: ViewPropTypes,
}


export default Page