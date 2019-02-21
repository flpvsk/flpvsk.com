import styled from '@emotion/styled';
import {
  space,
  width,
  flex,
  maxWidth,
  minHeight,
  maxHeight,
  background,
  color,
  gridRow,
  gridColumn,
} from 'styled-system'

const Box = styled.div(
  space,
  width,
  gridRow,
  gridColumn,
  flex,
  maxWidth,
  minHeight,
  maxHeight,
  color,
  background,
);

Box.propTypes = {
  ...space.propTypes,
  ...flex.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
  ...minHeight.propTypes,
  ...color.propTypes,
};

export default Box;
