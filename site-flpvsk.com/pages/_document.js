import Document, { Head, Main, NextScript } from 'next/document';
import {
  ServerStyleSheet,
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components';

import theme from '../theme';


const GlobalStyle = createGlobalStyle`
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

  html, body, .root {
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
    background: ${props => props.theme.colors.secondary}
  }

  ::-moz-selection {
    background: ${props => props.theme.colors.secondary}
  }
`;

class SiteDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
      <ThemeProvider theme={theme}>
        <html>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width" />
            <GlobalStyle />
            {styleTags}
          </Head>

          <body>
            <div className="root">
              {main}
            </div>
            <NextScript />
          </body>
        </html>
      </ThemeProvider>
    );
  }
}

export default SiteDocument;
