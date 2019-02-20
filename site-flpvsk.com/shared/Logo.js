import React from 'react';
import styled from '@emotion/styled';
import Svg from './Svg';

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
    <Svg width={size} height={size} viewBox="0 0 80 80">
      <title>{TITLE}</title>
      <description>{DESCRIPTION}</description>
      <polygon
        className="logo__outer"
        fill={outerColor}
        points="0 80 80 80 40 0"></polygon>
      <polygon className="logo__inner"
        fill={innerColor}
        points="20 80 60 80 40 40"></polygon>
    </Svg>
  );
}

export default Logo;
