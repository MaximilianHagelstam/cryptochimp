import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Head from "next/head";
import Layout from "../layout";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>CryptoChimp</title>
        <meta
          name="description"
          content="CryptoChimp is a game based on the crypto market"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
