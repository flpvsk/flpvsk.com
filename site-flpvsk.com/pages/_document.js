import Document, { Head, Main, NextScript } from 'next/document';

import MetaFavicon from '~/shared/MetaFavicon';

// import {
//   ServerStyleSheet,
//   createGlobalStyle,
//   ThemeProvider,
// } from 'styled-components';

import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core'
import theme from '../theme';



class SiteDocument extends Document {
  render () {
    const globalStyle = css`

      @font-face {
        font-family: 'Roboto Condensed';
        font-display: swap;
        font-style: normal;
        font-weight: 400;
        src:
          local('Roboto Condensed'),
          local('RobotoCondensed-Regular'),
          url(/static/RobotoCondensed-Regular.ttf) format('truetype'),
          url(/static/RobotoCondensed-Regular.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      html {
        font-size: 100%;
      }

      html, body {
        margin: 0;
        max-width: 100%;

        text-size-adjust: 100%;
        text-rendering: optimizeLegibility;
        font-smoothing: antialiased;
        -webkit-font-smoothing: antialiased;
      }

      html, body, .root, #__next {
        height: 100%;
      }

      button,
      input,
      select,
      textarea {
        font-family: inherit;
      }

      *, *:before, *:after {
        box-sizing: border-box;
      }

      ::selection {
        background: ${theme.colors.secondary}
      }

      ::-moz-selection {
        background: ${theme.colors.secondary}
      }

      input, button, a {
        outline-color: ${theme.colors.secondary};
      }
    `;

    return (
      <ThemeProvider theme={theme}>
        <html lang='en'>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width" />

            <MetaFavicon />

            <Global styles={globalStyle} />
          </Head>

          <body>
            <div className="root">
              <Main />
            </div>
            <NextScript />
          </body>
        </html>
      </ThemeProvider>
    );
  }
}

export default SiteDocument;
