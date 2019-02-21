import Head from 'next/head';
import siteInfo from '../siteInfo';

import TextBody from '../shared/TextBody';
import LinkExternal from '../shared/LinkExternal';
import LinkText from '../shared/LinkText';

function HeroText() {
  return (
    <>
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
    </>
  );
}

const Home = () => {
  return (
    <div className="page">
      <Head>
        <title>{siteInfo.siteName}</title>
      </Head>
      <h1>Hi</h1>
      <HeroText />
    </div>
  );
}

export default Home;
