import styled from '@emotion/styled';
import {
  space,
  width,
  position,
  gridRow,
  gridColumn,
  flex,
  display,
  alignSelf,
  alignItems,
  justifyContent,
  flexDirection,
  color,
  background,
  backgroundRepeat,
  maxWidth,
} from 'styled-system'


const FlexBox = styled.div(
  space,
  maxWidth,
  display,
  flexDirection,
  alignSelf,
  justifyContent,
  alignItems,
  flex,
  gridRow,
  gridColumn,
  color,
  background,
  backgroundRepeat,
  position,
);

FlexBox.defaultProps = {
  display: 'flex',
};


export default FlexBox;
