import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, createGlobalStyle } from "styled-components";

const GlobalStyles = () =>
  createGlobalStyle`
    
   a {
        text-decoration: none;
    }
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()]
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <GlobalStyles />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
