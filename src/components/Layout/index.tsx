import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | CryptoChimp`}</title>
        <meta
          name="description"
          content="CryptoChimp is a crypto trading game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full">
        <Navbar />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
