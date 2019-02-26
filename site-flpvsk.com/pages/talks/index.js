import Head from 'next/head';
import Link from 'next/link'

import Box from '~/shared/Box';
import BoxGrid from '~/shared/BoxGrid';

import TextHeading from '~/shared/TextHeading';

import Menu from '~/shared/Menu';
import Footer from '~/shared/Footer';

import siteInfo from '~/siteInfo';

import TalksContent from '~/texts/talks.md';

export default function Talks() {
  return (
    <BoxGrid
      gridTemplateColumns={'100vw'}
      gridTemplateRows={'auto'}
    >
      <Head>
        <title>{`Talks – ${siteInfo.siteName}`}</title>
        <MetaFavicon />
      </Head>
      <Menu currentItemId='talks' />

      <Box
        as='article'
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
            mt={[ 4, 5, 6 ]}
            textAlign='center'
          >
            My talks and guest appearances
          </TextHeading>
        </header>

        <Box mt={[ 7, 8, 9 ]}>
          <TalksContent />
        </Box>
      </Box>
      <Footer />
    </BoxGrid>
  );
}
