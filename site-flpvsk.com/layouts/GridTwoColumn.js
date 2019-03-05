import { MDXProvider } from '@mdx-js/tag';

import Box from '../shared/Box';
import BoxGrid from '../shared/BoxGrid';
import components from '../shared/mdxComponentsMain';

export default function GridTwoColumn({ children }) {
  return (
    <MDXProvider components={components}>
      <BoxGrid
        gridTemplateRows='auto'
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
        gridColumnGap={[5, 5, 8, 8]}
        gridRowGap={[0, 0, 1, 1]}
      >
        {children.props.children}
      </BoxGrid>
    </MDXProvider>
  );
}
