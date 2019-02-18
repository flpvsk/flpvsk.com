import Head from 'next/head';
import { MDXProvider } from '@mdx-js/tag'
import styled, { ThemeProvider } from 'styled-components';
import {
  space,
  width,
  maxWidth,
  textAlign,
  textStyle,
  fontFamily,
  color
} from 'styled-system'

import siteInfo from '../siteInfo';
import theme from '../theme';

const H1 = styled.h1`
  ${space}
  ${textStyle}
  ${color}
  ${textAlign}
`;


const H2 = styled.h2`
  ${space}
  ${textStyle}
  ${color}
  ${textAlign}
`;

const Body = styled.p`
  ${textStyle}
  ${color}
  ${space}
`;

const Code = styled.code`
  ${textStyle}
  ${color}
`;

const Link = styled.a`
  ${color}
`;

const ListItem = styled.li`
  ${textStyle}
  ${color}
  ${space}

  list-style: none;
  list-style-image: none;

  ::before {
    padding-right: 15px;
    font-size: 18px;
    content: '•';
  }
`;

const UnorderedList = styled.ul`
  ${space}
`;


const components = {
  h1: (props) => (
    <H1
      textStyle='h2'
      textAlign='center'
      mt={0}
      mb={4}
      color='black'>{props.children}</H1>
  ),
  h2: (props) => (
    <H2
      textStyle='h4'
      color='blacks.0'
      mt={6}
      mb={1}>{props.children}</H2>
  ),
  p: (props) => (
    <Body
      {...props}
      textStyle='body'
      color='blacks.0'
      mt={0}
      mb={3} />
  ),
  a: (props) => (
    <Link
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
      textStyle='code' />
  ),
};

const Box = styled.div`
  ${space}
  ${width}
  ${maxWidth}
`;

Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
};

export default function BlogPostLayout(props) {
  const meta = props.meta || {};
  const titleText = props.meta.title || '';

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <>
          <Head>
            <title>{titleText}{` – ${siteInfo.blogName}`}</title>
          </Head>
          <Box ml={[3, 4, 5]} mr={[3, 4, 5]} pb={5}>
            <Box width={1} maxWidth={700} ml='auto' mr='auto'>
              {props.children}
            </Box>
          </Box>
        </>
      </MDXProvider>
    </ThemeProvider>
  );
}

export function makeBlogPost(meta) {
  return function makeBlogPostWrapper(props) {
    return <BlogPostLayout meta={meta} {...props} />;
  };
}
