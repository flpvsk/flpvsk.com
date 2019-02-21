import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core'
import {
  space,
  width,
  display,
  background,
  maxWidth,
  minHeight,
  textAlign,
  textStyle,
  fontSize,
  color,
  border,
  borderColor,
  boxShadow,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  gridRowGap,
  gridColumnGap,
  gridRow,
  flexDirection,
  flex,
  alignItems,
  justifyContent,
} from 'styled-system'

import Caption from './Caption';
import IconLinkTwitter from './IconLinkTwitter';
import IconLinkGithub from './IconLinkGithub';
import IconLinkEmail from './IconLinkEmail';
import LinkExternal from './LinkExternal';

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
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.15 0"/>
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

const FooterBox = styled.footer(
  props => css`
    background-color: ${props.theme.colors.primary};
    background-image: ${
      `url(data:image/svg+xml;utf8,` +
      `${inlineSvgNoise(props.theme.colors.primary)})`
    };
  `,
  space,
  width,
  display,
  color,
  display,
  gridTemplateColumns,
  gridTemplateRows,
  gridAutoFlow,
  gridRowGap,
  gridColumnGap,
);


const FlexBox = styled.div(
  space,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  flex,
  gridRow,
);

FlexBox.defaultProps = {
  display: 'flex',
};


function TextLicense() {
  return (
    <>
      {`All text licensed under the `}
      <LinkExternal
        color={'black'}
        href='https://creativecommons.org/licenses/by-nc/4.0/'>
          Creative Commons
          Attribution-NonCommercial 4.0 International License
      </LinkExternal>
      {`.`}
    </>
  );
}

function SourceCodeLicense() {
  return (
    <>
      <LinkExternal
        color={'black'}
        href='https://github.com/flpvsk/flpvsk.com'>
          Source code of the website
      </LinkExternal>
      {` licensed under the `}
      <LinkExternal
        color={'black'}
        href='https://tldrlegal.com/license/mit-license'>
          {`MIT License.`}
      </LinkExternal>
    </>
  );
}

const Input = styled.input(
  space,
  width,
  maxWidth,
  textStyle,
  color,
  fontSize,
  border,
  borderColor,
  flex,
);

Input.defaultProps = {
  pr: 1,
  pl: 1,
  pb: '4px',
  pt: '4px',
  textStyle: 'caption',
  fontSize: [0, 1],
  color: 'blacks.0',
  border: '1px solid',
  borderColor: 'blacks.2',
  flex: 1,
  maxWidth: '15em',
};

const Button = styled.button(
  space,
  width,
  textStyle,
  fontSize,
  color,
  border,
  background,
  boxShadow,
);

Button.defaultProps = {
  pr: 1,
  pl: 1,
  pb: '4px',
  pt: '4px',
  textStyle: 'caption',
  fontSize: [0, 1],
  border: 'none',
  background: 'black',
  color: 'white',
  boxShadow: 'button',
}


export default function Footer() {
  return (
    <FooterBox
      w={'100%'}
      pt={2}
      pb={2}
      pr={[2, 3, 4]}
      pl={[2, 3, 4]}
      display='grid'
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '2fr 1fr 1fr']}
      gridTemplateRows={['auto auto', 'auto auto', '1fr']}
      gridAutoFlow={['row', 'row', 'column']}
      gridRowGap={0}
      gridColumnGap={4}
    >
        <FlexBox mt={[4, 4, 0]} flexDirection='column'>
          <Caption mb={2}>
            <TextLicense />
          </Caption>
          <Caption mb={[4, 4, 0]}>
            <SourceCodeLicense />
          </Caption>
        </FlexBox>
        <FlexBox
          gridRow={[1, 1, 1]}
          flexDirection='column'
          alignItems={['flex-start', 'flex-start', 'flex-start']}
        >
          <form style={{width: '100%'}}>
            <Caption
              as='label'
              htmlFor='subscribe-input-footer'
              display='block'
              mb={1}>
                Get notified when I publish new posts
            </Caption>
            <FlexBox>
              <Input
                id='subscribe-input-footer'
                type='email'
                placeholder='Email' />
              <Button ml={1}>Subscribe</Button>
            </FlexBox>
          </form>
        </FlexBox>
        <FlexBox
          gridRow={[2, 2, 1]}
          mt={[4, 4, 0]}
          flex={[0, 0, 1]}
          alignItems={['flex-start']}
          flexDirection='row'
          justifyContent={['flex-start', 'flex-start', 'flex-end']}>
            <IconLinkTwitter height={24} />
            <IconLinkGithub height={24} ml={3} />
            <IconLinkEmail height={24} ml={3} />
        </FlexBox>
    </FooterBox>
  );
}
