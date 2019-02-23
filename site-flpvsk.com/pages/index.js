import Head from 'next/head';
import Link from 'next/link'
import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { right, width, height, } from 'styled-system';

import siteInfo from '../siteInfo';

import Box from '../shared/Box';
import BoxGrid from '../shared/BoxGrid';
import BoxFlex from '../shared/BoxFlex';

import noiseBackground from '../shared/noiseBackground';

import Logo from '../shared/Logo';
import Caption from '../shared/Caption';
import TextBody from '../shared/TextBody';
import TextHeading from '../shared/TextHeading';
import LinkExternal from '../shared/LinkExternal';
import LinkExternalNoDecoration from '../shared/LinkExternalNoDecoration';
import LinkText from '../shared/LinkText';

import IconLinkTwitter from '../shared/IconLinkTwitter';
import IconLinkGithub from '../shared/IconLinkGithub';
import IconLinkEmail from '../shared/IconLinkEmail';

import SvgPlay from '../shared/SvgPlay';
import SvgLink from '../shared/SvgLink';

import Input from '../shared/Input';
import Button from '../shared/Button';

import Footer from '../shared/Footer';

import HeroText from '../texts/hero.md';
import Polychops from '../texts/polychops.md';
import Matterway from '../texts/matterway.md';
import Mindojo from '../texts/mindojo.md';
import InfluencesContent from '../texts/influences.md';

const ImgPortrait = styled.img({
  position: 'absolute',
  bottom: 0,
}, right, width, height);


function SvgArrow(props) {
  return (
    <svg style={props} viewBox='0 0 200 90'>
      <path d='M0 0 L100 90 L200 0 Z' />
    </svg>
  );
}


const svgRect = (color) => (
  `<svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 300 20"
      width="300"
      height="20">
        <rect x='0' y='0' width='7.5rem' height='20' fill='${color}' />
    </svg>
  `.replace(/\n/, '').replace(/\s+/, ' ')
);


function Hero() {
  return (
    <BoxGrid
      gridTemplateColumns={['1fr', '1fr', '1fr 240px', '40fr 320px']}
      gridTemplateRows={
        [
          'auto 160px',
          'auto 160px',
          '1fr'
        ]
      }>
        <Box alignSelf='center'>
          <TextHeading
            as='h1'
            textStyle='h1'
            mt={[1, 1, 0, 0]}
            mb={[2, 2, 2, 2]}
            fontSize={[7, 7, 8, 8]}>
              {siteInfo.siteName}
          </TextHeading>

          <HeroText mb={5} />

          <Box mb={3}>
            <IconLinkTwitter height={24} />
            <IconLinkGithub height={24} ml={3} />
            <IconLinkEmail height={24} ml={3} />
          </Box>
        </Box>
        <BoxFlex
          alignSelf='stretch'
          justifyContent='flex-end'
          pt={[0, 0, 4]}
          pr={0}
          position='relative'
        >
          <Logo
            display={['none', 'none']}
            pt={[0]}
            pr={[0]}
            size={[24, 24, 32, 40]}
            innerColor={'white'}
            outerColor={'black'} />
          <Box
            as='figure'
            position='absolute'
            bottom={0}
            right={[-16, -24, -32]}
            height={[151, 151, 227, 302]}
            width={[160, 160, 200, 320]}
            m={0}
          >
            <Box
              as='figcaption'
              display='block'
              position='absolute'
              left={[-64, -64, -24, -12]}
              top={'64%'}
              pl={1}
              pr={1}
              pt={'4px'}
              pb={'4px'}
              bg={'black'} >
                <Caption
                  fontSize={[0, 0, 1, 1]}
                  color='white'>
                    {`Hello =)`}
                </Caption>
            </Box>
            <ImgPortrait
              src='/static/portrait.webp'
              width={[160, 160, 200, 320]}
               />
          </Box>
      </BoxFlex>
    </BoxGrid>
  );
}

const HeroSection = styled(BoxGrid)(
  noiseBackground
);


const TextSectionHeader = styled(TextHeading)();
TextSectionHeader.defaultProps = {
  as: 'h2',
  textStyle: 'h2',
  mb: 5,
  mt: 7,
  fontSize: [6, 6, 7, 7],
};


function PostPreview(props) {
  const {
    title,
    description,
    path,
  } = props;

  return (
    <Box as='article' maxWidth={'43rem'} mt={0} mb={[5, 5, 7]}>
      <TextHeading
        as='h3'
        textStyle='h3'
        fontSize={[4, 4, 5, 5]}
        mb={2}>
          <Link href={path} passHref={true} prefetch>
            <LinkText>
              {title}
            </LinkText>
          </Link>
      </TextHeading>
      <TextBody fontSize={[1, 1, 2, 2]}>
        {description}
      </TextBody>
    </Box>
  );
}

function RecentPosts({ theme }) {
  return (
    <BoxGrid
      id='RecentPosts'
      as='section'
      gridTemplateColumns={['1fr', '1fr', '7fr 2fr', '7fr 4fr']}
      gridColumnGap={[ 5, 5, 8, 8 ]}
      gridTemplateRows='auto auto'
      gridAutoFlow='column'
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}>

        <Box gridColumn={`1 / 3`} gridRow={1}>
          <TextSectionHeader>
            Recent posts
          </TextSectionHeader>
        </Box>

        <Box gridRow={2} gridColumn={1}>
          {
            siteInfo.posts.slice(0, 3).map((post, i) => (
              <PostPreview key={`post-${i}`} {...post} />
            ))
          }
        </Box>

        <BoxFlex
          gridRow={2}
          gridColumn={2}
          mt={-2}
          justifyContent='center'
          display={['none', 'none', 'flex', 'flex']}>
            <Box as='form' m={0}>
              <Box
                pt={2}
                mb={10}
                position='relative'
                backgroundRepeat='no-repeat'
                backgroundSize='19rem 94%'
                backgroundPosition='top -20px'
                background={
                  `url(data:image/svg+xml;utf8,` +
                  `${escape(svgRect(theme.colors.primary))})`
                }>
                  <TextHeading
                    as='label'
                    htmlFor={'subscribe-email-input'}
                    textStyle='h3'
                    lineHeight={'1em'}
                    zIndex={2}
                    display={'block'}
                    maxWidth={'4em'}
                    fontSize={[6, 6, 7, 7]}>
                      Get notified when I publish new posts
                  </TextHeading>
                  <SvgArrow
                    position='absolute'
                    left='-2.8rem'
                    bottom='-4.4rem'
                    height='6rem'
                    zIndex={-1}
                    fill={theme.colors.primary} />
              </Box>
              <BoxFlex flexDirection='column'>
                <Input
                  id='subscribe-email-input'
                  mb={1}
                  width={`100%`}
                  placeholder='Email'
                  type='email' />
                <Button alignSelf='flex-end'>Subscribe</Button>
              </BoxFlex>
            </Box>
        </BoxFlex>
    </BoxGrid>
  );
}

function Work() {
  return (
    <BoxGrid
      as='section'
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}
      gridTemplateColumns={'1fr'}
      gridTemplateRows={'auto'}>
        <TextSectionHeader>Work</TextSectionHeader>
        <Polychops mb={4} />
        <Matterway mb={4} />
        <Mindojo mb={4} />
    </BoxGrid>
  );
}

function Separator({ n = 1 }) {
  return (
    <BoxFlex mt={[4, 4, 4, 6]}>
      <img
        width='100%'
        height='60px'
        src={`/static/separator-${n}.svg`} alt='Separator' />
    </BoxFlex>
  );
}

function Influences() {
  return (
    <BoxGrid
      as='section'
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}
      mb={4}
      gridTemplateColumns={'1fr'}
      gridTemplateRows={'auto'}>
        <TextSectionHeader>Influences</TextSectionHeader>
        <InfluencesContent />
    </BoxGrid>
  );
}

const Home = withTheme(({ theme }) => {
  return (
    <BoxGrid
      gridTemplateRows={[
        'minmax(100vh, auto) repeat(auto-fit, minmax(15rem , auto))'
      ]}
      gridTemplateColumns={['1fr']}>
        <Head>
          <title>{siteInfo.siteName}</title>
        </Head>

        <HeroSection
          as='section'
          pl={[2, 3, 4]}
          pr={[2, 3, 4]}
          borderBottom='1px solid'
          borderColor='blacks.1'>
            <Hero />
        </HeroSection>

        <Work />
        <Separator />

        <RecentPosts theme={theme}/>
        <Separator n={2} />

        <Influences />
        <Footer />
    </BoxGrid>
  );
});


export default Home;

