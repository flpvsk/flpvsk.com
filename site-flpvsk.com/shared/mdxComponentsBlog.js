import Caption from '../shared/Caption';
import LinkExternal from '../shared/LinkExternal';
import TextBody from '../shared/TextBody';
import TextHeading from '../shared/TextHeading';

import styled from '@emotion/styled';
import { css } from '@emotion/core'

import {
  space,
  textStyle,
  fontSize,
  color
} from 'styled-system'

const Code = styled.code(
  fontSize,
  textStyle,
  color,
);


const ListItem = styled.li(
  css`
    list-style: none;
    list-style-image: none;

    ::before {
      padding-right: 15px;
      font-size: 18px;
      content: '•';
    }
  `,
  fontSize,
  textStyle,
  color,
  space,
);

const UnorderedList = styled.ul(
  space
);


const components = {
  h1: (props) => {
    return null;
  },
  h2: (props) => (
    <TextHeading
      as='h2'
      fontSize={[4, 5, 6]}
      textStyle='h4'
      color='blacks.0'
      mt={6}
      mb={1}>{props.children}</TextHeading>
  ),
  h3: (props) => (
    <TextHeading
      as='h3'
      fontSize={[3, 4, 5]}
      textStyle='h4'
      color='blacks.0'
      mt={6}
      mb={1}>{props.children}</TextHeading>
  ),
  p: (props) => (
    <TextBody
      {...props}
      mt={0}
      mb={3} />
  ),
  a: (props) => (
    <LinkExternal
      {...props}
      color={'secondaryDark'} />
  ),
  ul: (props) => (
    <UnorderedList
      {...props}
      pl={'4px'}
      ml={0}
      mb={2}
    />
  ),
  li: (props) => (
    <ListItem
      {...props}
      fontSize={[1, 2, 3]}
      textStyle='body'
      pb={2}
      color='blacks.0' />
  ),

  code: (props) => (
    <Code
      {...props}
      textStyle='code' />
  ),

  inlineCode: (props) => (
    <Code
      {...props}
      bg={'blacks.3'}
      fontSize={'0.93em'}
      textStyle='code' />
  ),
};

export default components;
