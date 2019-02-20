import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
