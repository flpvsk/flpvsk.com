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


function HeroText() {
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
            mt={[2, 2, 0, 0]}
            mb={[3, 3, 5]}
            fontSize={[7, 7, 8, 8]}>
              Andrey Salomatin
          </TextHeading>

          <Box maxWidth={'43rem'}>
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
              {`. `}
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
            <TextBody pb={5}>
              {`I write, speak and podcast about things I’m interested in.`}
            </TextBody>
          </Box>

          <Box>
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
                    That’s me.
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


function PostPreview(props) {
  const {
    title,
    description,
    path,
  } = props;

  return (
    <Box as='article' maxWidth={'43rem'} mt={0} mb={7}>
      <Link href={path} passHref={true} prefetch>
        <LinkText>
          <TextHeading
            as='h3'
            textStyle='h3'
            fontSize={[4, 4, 5, 5]}
            mb={2}>
              {title}
          </TextHeading>
        </LinkText>
      </Link>
      <TextBody fontSize={[1, 1, 2, 2]}>
        {description}
      </TextBody>
    </Box>
  );
}

function RecentPosts({ theme }) {
  return (
    <BoxGrid
      gridTemplateColumns={['1fr', '1fr', '7fr 2fr', '7fr 4fr']}
      gridColumnGap={[ 5, 5, 8, 8 ]}
      gridTemplateRows='auto auto'
      gridAutoFlow='column'
      mt={10}
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}>
        <Box gridColumn={`1 / 3`} gridRow={1}>
          <TextHeading
            as='h2'
            textStyle='h2'
            mb={5}
            fontSize={[6, 6, 7, 7]}>
              Recent posts
          </TextHeading>
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

const TextSectionHeader = styled(TextHeading)();
TextSectionHeader.defaultProps = {
  as: 'h2',
  textStyle: 'h2',
  mb: 5,
  mt: 7,
  fontSize: [6, 6, 7, 7],
};

const TextItemHeader = styled(TextHeading)();
TextItemHeader.defaultProps = {
  as: 'h3',
  textStyle: 'h3',
  fontSize: [4, 4, 5, 5],
  mb: 2,
  mt: 0,
};

const TextItemBody = styled(TextBody)();
TextItemBody.defaultProps = {
  fontSize: [1, 1, 2, 2],
};


function WorkItem({ title, text, logo, links, mb }) {
  return (
    <BoxGrid
      id='Matterway'
      mb={mb}
      gridTemplateColumns={[
        '1fr',
        '1fr',
        '7fr minmax(11rem, 2fr)',
        '7fr 4fr'
      ]}
      gridColumnGap={[ 5, 5, 8, 8 ]}
      gridTemplateRows={'auto'}>

        <Box
          gridColumn={'1'}
          gridRow={[2, 2, 1, 1]}>

            <TextItemHeader display={['none', 'none', 'block']} >
              Matterway / B2B SaaS
            </TextItemHeader>

            <TextItemBody mb={3}>
              I joined the company early on and helped define and implement
              the product.
            </TextItemBody>
            <TextItemBody mb={3}>
              Our software allows customers to build usable apps on top of
              their existing systems of record. Those apps would work
              both on
              Desktop and Mobile platforms. Using our platform each app
              would take several hours to several days to build,
              instead of months using traditional tools.
            </TextItemBody>
            <TextItemBody mb={3}>
              My role in the company evolved from a senior
              developer to a product manager.  By the time I left the
              company 30% of DAX companies were our customers or doing
              pilots with us.
            </TextItemBody>
        </Box>

        <BoxFlex
          mb={[2, 2, 0, 0]}
          flexDirection={'column'}
          gridColumn={[1, 1, 2, 2]}
          gridRow={[1, 1, 1, 1]} >
            <img
              style={{width: '100%', maxWidth: '200px', maxHeight: '80px'}}
              src='/static/logo-matterway.svg'
              alt='Matterway logo' />

            <BoxFlex
              mt={[1, 1, 4]}
              alignItems={['center', 'center', 'flex-start']}
              flexDirection={['row', 'row', 'column']}>
                <LinkExternalNoDecoration
                  mr={[4, 4, 0]}
                  href='https://youtube.com'>
                    <BoxFlex
                      minHeight={'2rem'}
                      alignItems={'center'}>
                        <SvgPlay
                          height={'1.8rem'}
                          width={'1.8rem'}
                          color='blacks.1'
                          pt='2px'
                          mr={1} />
                        <Caption as='span' color='blacks.0'>
                          Early product demo
                        </Caption>
                    </BoxFlex>
                </LinkExternalNoDecoration>

                <LinkExternalNoDecoration href='https://matterway.io'>
                  <BoxFlex
                    minHeight={'2rem'}
                    alignItems={'center'}>
                      <SvgLink
                        height={'1.8rem'}
                        width={'1.8rem'}
                        color='blacks.1'
                        pt='2px'
                        mr={1} />
                      <Caption as='span' color='blacks.0'>
                        matterway.io
                      </Caption>
                  </BoxFlex>
                </LinkExternalNoDecoration>
            </BoxFlex>
        </BoxFlex>
    </BoxGrid>
  );
}

function Work() {
  return (
    <BoxGrid
      pl={[2, 3, 4]}
      pr={[2, 3, 4]}
      gridTemplateColumns={'1fr'}
      gridTemplateRows={'auto'}>
        <TextSectionHeader>Work</TextSectionHeader>
        <WorkItem mb={8} />
        <WorkItem mb={8} />
        <WorkItem />
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
          pl={[2, 3, 4]}
          pr={[2, 3, 4]}
          borderBottom='1px solid'
          borderColor='blacks.1'>
            <HeroText />
        </HeroSection>
        <RecentPosts theme={theme}/>
        <BoxFlex mt={[4, 4, 4, 6]}>
          <img
            width='100%'
            height='60px'
            src='/static/separator-1.svg' alt='Separator' />
        </BoxFlex>
        <Work />
        <Footer />
    </BoxGrid>
  );
});

export default Home;
