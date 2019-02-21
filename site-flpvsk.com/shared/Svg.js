import React from 'react';
import styled from '@emotion/styled';
import tag from 'clean-tag';
import { width, height, display, } from 'styled-system'

const Svg = styled(tag.svg)(
  width,
  height,
  display,
);

export default Svg;
