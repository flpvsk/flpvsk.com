import Head from 'next/head';
import styled from '@emotion/styled';
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
import LinkText from '../shared/LinkText';


import Footer from '../shared/Footer';

const ImgPortrait = styled.img({
  position: 'absolute',
  bottom: 0,
}, right, width, height);

function HeroText() {
  return (
    <BoxGrid
      gridTemplateColumns={['1fr', '1fr', '40fr 27fr']}
      gridTemplateRows={
        [
          'auto 160px',
          'auto 160px',
          '1fr'
        ]
      }>
        <Box alignSelf='center'>
          <BoxFlex
            mt={[2, 2, 0, 0]}
            mb={[3, 3, 5]}
            justifyContent='space-between'>

            <TextHeading
              as='h1'
              textStyle='h1'
              fontSize={[7, 7, 8, 8]}>
                Andrey Salomatin
            </TextHeading>

            <Box pl={4} pt={2}>
              <Logo
                display={['none', 'none']}
                pt={[2]}
                pr={[0]}
                size={[24, 24, 32, 40]}
                innerColor={'white'}
                outerColor={'black'} />
            </Box>
          </BoxFlex>
          <TextBody pb={3}>
            {`Programmer, product manager, founder, hobbyist musician.`}
          </TextBody>
          <TextBody pb={3}>
            {`I helped build products like `}
            <LinkText color='blacks.0' href='#Matterway'>
              Matterway
            </LinkText>
            {`, `}
            <LinkText color='blacks.0' href='#Polychops'>
            Polychops
            </LinkText>
            {` and `}
            <LinkText color='blacks.0' href='#Mindojo'>Mindojo</LinkText>
            {` . `}
            {`Helped organize `}
            <LinkExternal color='blacks.0' href='https://moscowjs.ru'>
              MoscowJS
            </LinkExternal>
            {`, `}
            <LinkExternal
                color='blacks.0'
                href='http://frontend-union-conf.github.io/func2016/'>
                  Frontend Union Conf
            </LinkExternal>
            {` and `}
            <LinkExternal
              color='blacks.0'
              href='https://www.meetup.com/Kaizen-Berlin/'>
                Kaizen Berlin
            </LinkExternal>
            {`.`}
          </TextBody>
          <TextBody pb={3}>
            {`Currently I’m in the process of starting a `}
            {`product research and development agency called `}
            <LinkExternal color='blacks.0' href='https://mean.computer'>
              Mean Computer
            </LinkExternal>
            {`.`}
          </TextBody>
          <TextBody pb={3}>
            {`I write, speak and podcast about things I’m interested in.`}
          </TextBody>
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
            width={[160, 160, 240, 320]}
            m={0}
          >
            <Box
              as='figcaption'
              display='block'
              position='absolute'
              left={[-48, -48, -24, -12]}
              top={'64%'}
              pl={1}
              pr={1}
              pt={'4px'}
              pb={'4px'}
              bg={'black'} >
                <Caption
                  fontSize={[0, 0, 1, 1]}
                  color='white'>
                    That’s me
                </Caption>
            </Box>
            <ImgPortrait
              src='/static/portrait.webp'
              width={[160, 160, 240, 320]}
               />
          </Box>
      </BoxFlex>
    </BoxGrid>
  );
}

const HeroSection = styled(BoxGrid)(
  noiseBackground
);


function PostPreview(props) {
  const {
    title,
    description,
  } = props;

  return (
    <Box as='article' mt={0} mb={7}>
      <TextHeading
        as='h3'
        textStyle='h3'
        fontSize={[4, 4, 5, 5]}
        mb={2}>
          {title}
      </TextHeading>
      <TextBody fontSize={[1, 1, 2, 2]}>
        {description}
      </TextBody>
    </Box>
  );
}

function RecentPosts() {
  return (
    <BoxGrid
      gridTemplateColumns={['1fr', '1fr', '10fr 4fr']}
      gridTemplateRows='1fr'
      gridAutoFlow='column'
      mt={10}
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}>
        <Box>
          <TextHeading
            as='h2'
            textStyle='h2'
            mb={5}
            fontSize={[6, 6, 7, 7]}>
              Recent posts
          </TextHeading>
          {
            siteInfo.posts.slice(0, 3).map((post, i) => (
              <PostPreview key={`post-${i}`} {...post} />
            ))
          }
        </Box>
        <BoxFlex display={['none', 'none', 'flex', 'flex']}>
          Hi
        </BoxFlex>
    </BoxGrid>
  );
}

const Home = () => {
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
          pl={[2, 3, 4]}
          pr={[2, 3, 4]}
          borderBottom='1px solid'
          borderColor='blacks.1'>
            <HeroText />
        </HeroSection>
        <RecentPosts />
        <Footer />
    </BoxGrid>
  );
}

export default Home;
