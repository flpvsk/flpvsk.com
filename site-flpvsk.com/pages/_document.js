import Document, { Head, Main, NextScript } from 'next/document';
import {
  ServerStyleSheet,
  createGlobalStyle,
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
`;

export default class SiteDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
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
    );
  }
}
