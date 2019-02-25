import Link from 'next/link'
import styled from '@emotion/styled';

import BoxFlex from '~/shared/BoxFlex';
import LinkNoDecoration from '~/shared/LinkNoDecoration';

import Logo from '~/shared/Logo';

export const menuItems = [
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

export default function Menu({ items=menuItems, currentItemId }) {
  const itemsMapped = items.map(item => {
    return (
      <MenuItem
        key={item.id}
        mr={-1}
        ml={[ 3, 4 ]}
        height={60}
        alignItems={'stretch'}
        isSelected={currentItemId === item.id}
      >
        <Link href={item.href} passHref prefetch>
          <LinkNoDecoration
            display='flex'
            alignItems='center'
            textStyle='caption'
            fontSize={2}
            color='inherit'
            pr={1}
            pl={1}
          >
            {item.title}
          </LinkNoDecoration>
        </Link>
      </MenuItem>
    );
  });

  return (
    <BoxFlex
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}
      alignItems='stretch'
      borderBottom='1px solid'
      borderColor='black'
    >
      <Link href={'/'} passHref prefetch>
        <LinkNoDecoration
          display='flex'
          alignItems='center'
        >
          <Logo size={40} innerColor={'primary'} outerColor='black' />
        </LinkNoDecoration>
      </Link>
      {itemsMapped}
    </BoxFlex>
  );
}
