import styled from '@emotion/styled';
import {
  space,
  width,
  gridRow,
  gridColumn,
  flex,
  display,
  alignItems,
  justifyContent,
  flexDirection,
  color,
  background,
} from 'styled-system'


const FlexBox = styled.div(
  space,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  flex,
  gridRow,
  gridColumn,
  color,
  background,
);

FlexBox.defaultProps = {
  display: 'flex',
};


export default FlexBox;
