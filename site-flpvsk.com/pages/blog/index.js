import Head from 'next/head';
import Link from 'next/link'
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { right, width, height, } from 'styled-system';

import Box from '~/shared/Box';
import BoxGrid from '~/shared/BoxGrid';
import BoxFlex from '~/shared/BoxFlex';
import LinkNoDecoration from '~/shared/LinkNoDecoration';

import TextHeading from '~/shared/TextHeading';
import Caption from '~/shared/Caption';

import Menu from '~/shared/Menu';
import Footer from '~/shared/Footer';
import PostPreview from '~/shared/PostPreview';

import siteInfo from '~/siteInfo';


export default function Blog() {
  return (
    <BoxGrid
      gridTemplateColumns={'100vw'}
      gridTemplateRows={'auto'}
    >
      <Head>
        <title>{siteInfo.blogTitle}</title>
      </Head>
      <Menu currentItemId='blog' />

      <Box
        maxWidth={'45em'}
        ml='auto'
        mr='auto'
        pl={[ 2, 3, 4 ]}
        pr={[ 2, 3, 4 ]}
        pb={[ 3, 4, 5 ]}
      >
        <header>
          <TextHeading
            as='h1'
            textStyle='h2'
            fontSize={[ 6, 7, 8 ]}
            color='black'
            mt={[ 3, 4, 5 ]}
            textAlign='center'
          >
            {siteInfo.blogName}
          </TextHeading>
          <TextHeading
            as='h2'
            textStyle='h3'
            fontSize={[ 2, 3, 4 ]}
            color='blacks.0'
            mt={[ 1, 1, 1 ]}
            textAlign='center'
          >
            {`blog by Andrey Salomatin`}
          </TextHeading>
        </header>

        <Box mt={[ 7, 8, 9 ]}>
          {
            siteInfo.posts.slice(0, 3).map((post, i) => (
              <PostPreview key={`post-${i}`} {...post} />
            ))
          }
        </Box>
      </Box>
      <Footer />
    </BoxGrid>
  );
}
