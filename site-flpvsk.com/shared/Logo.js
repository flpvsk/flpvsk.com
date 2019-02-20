import React from 'react';
import styled from 'styled-components';
import tag from 'clean-tag';
import { width, height } from 'styled-system'

const Svg = styled(tag.svg)`
  ${width}
  ${height}
`;

const TITLE = 'Website logo';

const DESCRIPTION = (
  `Two equilateral triangles of different size and different color ` +
  `nested within one another. ` +
  `Bottom sides of both are aligned.`
);

function Logo({
  outerColor,
  innerColor,
  size,
}) {

  return (
    <Svg width={size} height={size} viewBox="0 0 800 800">
      <title>{TITLE}</title>
      <description>{DESCRIPTION}</description>
      <polygon
        className="logo__outer"
        fill={outerColor}
        points="0 800 800 800 400 0"></polygon>
      <polygon className="logo__inner"
        fill={innerColor}
        points="200 800 600 800 400 400"></polygon>
    </Svg>
  );
}

export default Logo;
