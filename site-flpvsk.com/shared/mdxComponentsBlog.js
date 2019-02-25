import styled from '@emotion/styled';
import { css } from '@emotion/core'

import Caption from '../shared/Caption';
import LinkExternal from '../shared/LinkExternal';
import TextBody from '../shared/TextBody';
import TextHeading from '../shared/TextHeading';
import Separator from '~/shared/Separator';

import BoxFlex from '~/shared/BoxFlex';

import {
  space,
  width,
  maxWidth,
  textStyle,
  fontSize,
  color,
  borders,
  borderColor,
} from 'styled-system'

const Code = styled.code(
  fontSize,
  textStyle,
  color,
);


const ListItem = styled.li(
  css`
    ul > & {
      list-style: none;
      list-style-image: none;

      ::before {
        padding-right: 15px;
        font-size: 18px;
        content: '•';
      }
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

const Blockquote = styled.blockquote(
  {
    fontStyle: 'italic',
  },
  textStyle,
  space,
  borders,
  borderColor,
);


Blockquote.defaultProps = {
  textStyle: 'blockquote',
  m: 0,
  ml: -2,
  mb: 3,
  pl: 2,
  pt: 1,
  pb: 1,
  borderLeft: `4px solid`,
  borderColor: 'blacks.2',
}

const TextArticleBody = styled(TextBody)({
  marginTop: 0,
  '& + &': {
    marginTop: '24px',
  }
});

const Img = styled.img(
  space,
  width,
  maxWidth,
);

Img.defaultProps = {
  maxWidth: '100%'
};

const Hr = styled.hr(
  space,
  color,
  borders,
  borderColor,
);

Hr.defaultProps = {
  mt: 3,
  mb: 5,
  mr: '30%',
  ml: '30%',
  border: 'none',
  borderColor: 'black',
  borderBottom: '1px solid',
};


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

  p: (props) => {
    const { children } = props;
    if (!(children instanceof Array)) {
      if (children.props && children.props.name === 'img') {
        return children;
      }
    }
    return (
      <TextArticleBody
        {...props}
        mt={0} />
    );
  },

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

  blockquote: (props) => (
    <Blockquote
      {...props}
      fontSize={[1, 2, 3]} />
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

  img: (props) => {
    let figCaption;

    if (props.alt) {
      figCaption = (
        <Caption
          as={'figcaption'}
          bg={'black'}
          color={'white'}
          pt={'4px'}
          pb={'4px'}
          pr={1}
          pl={1}
        >
          {props.alt}
        </Caption>
      );
    }
    return (
      <BoxFlex
        as='figure'
        flexDirection='column'
        alignItems='center'
        m={0}
        mt={2}
        mb={6}
      >
        <Img mb={1} src={props.src} alt={props.alt} />
        {figCaption}
      </BoxFlex>
    );
  },

  hr: (props) => (
    <Hr />
  )
};

export default components;
