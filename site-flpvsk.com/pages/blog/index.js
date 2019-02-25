import Head from 'next/head';
import Link from 'next/link'
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { right, width, height, } from 'styled-system';

import Box from '~/shared/Box';
import BoxGrid from '~/shared/BoxGrid';
import BoxFlex from '~/shared/BoxFlex';
import LinkNoDecoration from '~/shared/LinkNoDecoration';
import Caption from '~/shared/Caption';

import Menu from '~/shared/Menu';

import siteInfo from '~/siteInfo';


export default function Blog() {
  return (
    <BoxGrid
      gridTemplateColumns={'100vw'}
      gridTemplateRows={'auto'}
    >
      <Head>
        <title>{siteInfo.blogName}</title>
      </Head>
      <Menu currentItemId='blog' />
    </BoxGrid>
  );
}
