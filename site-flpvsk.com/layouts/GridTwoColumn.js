import { MDXProvider } from '@mdx-js/tag'

import BoxGrid from '../shared/BoxGrid';

import TextItemBody from '../shared/TextItemBody';
import TextItemHeading from '../shared/TextItemHeading';
import LinkText from '../shared/LinkText';
import LinkExternal from '../shared/LinkExternal';

import Box from '../shared/Box';

const components = {
  h3: TextItemHeading,
  p: TextItemBody,
  a: (props) => {
    const { href } = props;

    if (!href || href.indexOf(':') === '-1') {
      return <LinkText colors='' {...props} />;
    }

    return <LinkExternal {...props} />
  },
};

export default function GridTwoColumn({ children }) {
  return (
    <MDXProvider components={components}>
      <BoxGrid
        gridTemplateRows='auto'
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr',]}
        gridColumnGap={[ 5, 5, 8, 8 ]}
        gridRowGap={[ 2, 2, 1, 1 ]} >
          {children.props.children}
      </BoxGrid>
    </MDXProvider>
  );
}
