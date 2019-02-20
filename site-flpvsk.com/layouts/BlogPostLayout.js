import Head from 'next/head';
import { MDXProvider } from '@mdx-js/tag'
import Link from 'next/link'

import Logo from '../shared/Logo';
import Footer from '../shared/Footer';

import Caption from '../shared/Caption';

import styled from '@emotion/styled';
import { css } from '@emotion/core'
import { withTheme } from 'emotion-theming';

import {
  space,
  width,
  display,
  alignItems,
  justifyContent,
  maxWidth,
  minHeight,
  maxHeight,
  textAlign,
  textStyle,
  fontSize,
  color
} from 'styled-system'

import siteInfo from '../siteInfo';

const H1 = styled.h1(
  space,
  textStyle,
  fontSize,
  color,
  textAlign,
);


const H2 = styled.h2(
  space,
  fontSize,
  textStyle,
  color,
  textAlign,
);

const Body = styled.p(
  fontSize,
  textStyle,
  color,
  space,
);

const Code = styled.code(
  fontSize,
  textStyle,
  color,
);

const ExternalLink = styled.a(
  css`
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(
      to right,rgba(0,0,0,.84) 100%,
      rgba(0,0,0,0) 0
    );
    background-image: linear-gradient(
      to right,
      currentColor 100%,
      currentColor 0
    );
    background-image: url(
      data:image/svg+xml;utf8,
      <svg preserveAspectRatio="none" viewBox="0 0 1 1" x…2000/svg">
        <line x1="0" y1="0" x2="1" y2="1" stroke="currentColor" />
      </svg>
    );
    background-size: 1px 1px;
    background-position: 0 1.05em;
    background-position: 0 calc(1em + 1px);
  `,
  fontSize,
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
    // <H1
    //   textStyle='h2'
    //   textAlign='center'
    //   mt={0}
    //   mb={4}
    //   color='black'>{props.children}</H1>

    return null;
  },
  h2: (props) => (
    <H2
      fontSize={[4, 5, 6]}
      textStyle='h4'
      color='blacks.0'
      mt={6}
      mb={1}>{props.children}</H2>
  ),
  p: (props) => (
    <Body
      {...props}
      fontSize={[1, 2, 3]}
      textStyle='body'
      color='blacks.0'
      mt={0}
      mb={3} />
  ),
  a: (props) => (
    <ExternalLink
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

const Box = styled.div`
  ${space}
  ${width}
  ${display}
  ${alignItems}
  ${justifyContent}
  ${maxWidth}
  ${minHeight}
  ${maxHeight}
  ${color}
`;

Box.propTypes = {
  ...space.propTypes,
  ...display.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
  ...minHeight.propTypes,
  ...color.propTypes,
};

const Article = styled.article`
  ${space}
  ${width}
  ${maxWidth}
`;

Article.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...maxWidth.propTypes,
};


function dateToText(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function InfoStripe({ author, date }) {
  let dateString = '';
  try {
    let d = dateToText(date);
    dateString = `/ ${d}`;
  } catch (e) {
    // no valid date
  }

  return (
    <Box
      bg='primary'
      display='flex'
      alignItems='center'
      p={1}
      ml={[-2, -3, -4]}
      mr={[-2, -3, -4]}
      mb={4}
    >
      <Caption
        pl={[2, 3, 4]}
        pr={[2, 3, 4]}
        width='100%'
        fontSize={[2, 3]}
        textAlign='center'>
          {`${author} ${dateString}`}
    </Caption>
    </Box>
  );
}


function BlogPostLayout({ meta = {}, theme, children }) {
  const titleText = meta.title || '';
  const author = meta.author;

  return (
    <MDXProvider components={components}>
      <>
        <Head>
          <title>{titleText}{` – ${siteInfo.blogName}`}</title>
        </Head>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          mb={[2, 1]}
          mt={[2]}
          maxHeight={'80px'}
          width={'100%'}>
            <Link prefetch href='/'>
              <a>
                <Logo
                  innerColor={theme.colors.primary}
                  outerColor={theme.colors.black}
                  size={[56, 60, 80]} />
              </a>
            </Link>
        </Box>
        <Article ml={[2, 3, 4]} mr={[2, 3, 4]} pb={5}>
          <Box maxWidth={'45em'} ml='auto' mr='auto'>
            <H1
              fontSize={[6, 7, 8]}
              textStyle='h2'
              textAlign='center'
              mt={0}
              mb={4}
              color='black'>{titleText}</H1>
          </Box>

          <InfoStripe {...meta} />

          <Box maxWidth={'45em'} ml='auto' mr='auto'>
            {children}
          </Box>
        </Article>
        <Footer />
      </>
    </MDXProvider>
  );
}

const BlogPostLayoutWithTheme = withTheme(BlogPostLayout);

export default BlogPostLayoutWithTheme;

export function makeBlogPost(meta) {
  return function makeBlogPostWrapper(props) {
    return <BlogPostLayoutWithTheme meta={meta} {...props} />;
  };
}
