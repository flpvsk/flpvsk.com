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
        <html>
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
