import React from 'react';
import styled from '@emotion/styled';

import {
  space,
  width,
  display,
  flex,
  color,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  gridRowGap,
  gridColumnGap,
  gridRow,
  borders,
  borderColor,
} from 'styled-system'

const BoxGrid = styled.div(
  space,
  width,
  flex,
  color,
  borders,
  borderColor,
  display,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  gridRowGap,
  gridColumnGap,
);


BoxGrid.defaultProps = {
  display: 'grid',
};

export default BoxGrid;
