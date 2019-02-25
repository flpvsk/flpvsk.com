import Head from 'next/head';
import { MDXProvider } from '@mdx-js/tag'
import Link from 'next/link'

import Box from '../shared/Box';
import BoxFlex from '../shared/BoxFlex';

import Logo from '../shared/Logo';
import Menu from '~/shared/Menu';
import Footer from '../shared/Footer';

import Caption from '../shared/Caption';
import LinkExternal from '../shared/LinkExternal';
import TextBody from '../shared/TextBody';
import TextHeading from '../shared/TextHeading';

import styled from '@emotion/styled';
import { css } from '@emotion/core'
import { withTheme } from 'emotion-theming';

import {
  space,
  textStyle,
  fontSize,
  color
} from 'styled-system'

import siteInfo from '../siteInfo';

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


function dateToText(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function InfoStripe({ author, publishDate }) {
  let dateString = '';
  try {
    let d = dateToText(publishDate);
    dateString = `/ ${d}`;
  } catch (e) {
    // no valid date
  }

  return (
    <BoxFlex
      bg='primary'
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
    </BoxFlex>
  );
}


function BlogPostLayout({ meta = {}, theme, children }) {
  const titleText = meta.title || '';
  const author = meta.author;

  return (
    <MDXProvider components={components}>
      <>
        <Head>
          <title>{titleText}{` – ${siteInfo.blogTitle}`}</title>
        </Head>
        <Menu />
        <Box
          as='article'
          ml={[ 2, 3, 4 ]}
          mr={[ 2, 3, 4 ]}
          mt={[ 3, 4, 5 ]}
          pb={5}
        >
          <Box as='header' w='100%'>
            <Box maxWidth={'45em'} ml='auto' mr='auto'>
              <TextHeading
                as='h1'
                fontSize={[6, 7, 8]}
                textStyle='h2'
                textAlign='center'
                mt={0}
                mb={4}
                color='black'>{titleText}</TextHeading>
            </Box>

            <InfoStripe {...meta} />
          </Box>

          <Box maxWidth={'45em'} ml='auto' mr='auto'>
            {children}
          </Box>
        </Box>
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
