import React from 'react';
import Head from 'next/head'

function GlobalStyle() {
  return (
    <style global jsx>
      {`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
    `}
    </style>
  );
}

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aluracord &mdash; The Witcher</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
