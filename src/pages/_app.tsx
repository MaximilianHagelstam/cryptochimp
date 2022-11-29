import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CryptoChimp</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          content="CryptoChimp lets you trade crypto on real market data"
          name="description"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
