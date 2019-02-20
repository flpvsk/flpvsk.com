import React from 'react';
import styled from 'styled-components';
import {
  space,
  width,
  display,
  alignItems,
  justifyContent,
  background,
  maxWidth,
  minHeight,
  textAlign,
  textStyle,
  fontSize,
  color
} from 'styled-system'

import Caption from './Caption';

import siteInfo from '../siteInfo';

function inlineSvgNoise(color) {
  return escape(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 300 300"
      width="300"
      height="300">
        <defs>
          <filter id="a">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.4"
              stitchTiles="stitch"
              result="noisy"/>
            <feColorMatrix
              in="noisy"
              result="noisy2"
              type="saturate"
              values="0"/>
            <feColorMatrix
              in="noisy2"
              result="noisy3"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.35 0"/>
            <feBlend
              in="SourceGraphic"
              in2="noisy3"
              mode="darken"/>
          </filter>
        </defs>
      <path filter="url(#a)" fill="${color}" d="M0 0h300v300H0z"/>
    </svg>
  `.replace(/\n/g, '').replace(/\s+/g, ' ')
  )
}

const Box = styled.div`
  ${space}
  ${width}
  ${display}
  ${color}

  background-color: ${props => props.theme.colors.primary};
  background-image: ${props => (
    `url(data:image/svg+xml;utf8,` +
    `${inlineSvgNoise(props.theme.colors.primary)})`
  )};
`;

function SvgNoise({ color }) {
  return (
    <svg
      id='bg-noise'
      style={{display: 'none'}}
      preserveAspectRatio='none'
      viewBox='0 0 24 24'
      width='96'
      height='96'>
        <defs>

        </defs>
        <g>
          <rect
            width='24'
            height='24'
            x='0'
            y='0'
            filter='url(#noise)'
            fill={color}></rect>
        </g>
    </svg>
  );
}



export default function Footer() {
  return (
    <Box
      w={'100%'}
      pt={2}
      pb={2}
      pr={[2, 3, 4]}
      pl={[2, 3, 4]}>
        <Caption>hola</Caption>
    </Box>
  );
}
