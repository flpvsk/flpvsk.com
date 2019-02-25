import Head from 'next/head';
import Link from 'next/link'
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { right, width, height, } from 'styled-system';

import Box from '~/shared/Box';
import BoxGrid from '~/shared/BoxGrid';
import BoxFlex from '~/shared/BoxFlex';
import Caption from '~/shared/Caption';

import Logo from '~/shared/Logo';

import siteInfo from '~/siteInfo';

const menuItems = [
  {
    id: 'main',
    title: 'Main',
    href: '/',
  },

  {
    id: 'blog',
    title: 'Blog',
    href: '/blog',
  },

  {
    id: 'talks',
    title: 'Talks',
    href: '/talks',
  },

  {
    id: 'music',
    title: 'Music',
    href: '/music',
  },
];

const MenuItem = styled(BoxFlex)(
  props => {
    const { white, black } = props.theme.colors;
    const { isSelected } = props;
    return {
      backgroundColor: isSelected ? black : white,
      color: isSelected ? white : black,

      '&:hover': {
        backgroundColor: props.theme.colors.black,
        color: props.theme.colors.white,
      }
    };
  }
);

function Menu({ items, currentItemId }) {
  const itemsMapped = items.map(item => {
    return (
      <MenuItem
        key={item.id}
        pr={1}
        pl={1}
        mr={-1}
        ml={4}
        height={60}
        alignItems={'center'}
        isSelected={currentItemId === item.id}
      >
        <Caption
          as='a'
          href={item.href}
          color='inherit'
        >
          {item.title}
        </Caption>
      </MenuItem>
    );
  });

  return (
    <BoxFlex
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}
      alignItems='center'
      borderBottom='1px solid'
      borderColor='black'
    >
      <Logo size={40} innerColor={'primary'} outerColor='black' />
      {itemsMapped}
    </BoxFlex>
  );
}

export default function Blog() {
  return (
    <BoxGrid
      gridTemplateColumns={'100vw'}
      gridTemplateRows={'auto'}
    >
      <Menu items={menuItems} currentItemId='blog' />
    </BoxGrid>
  );
}
