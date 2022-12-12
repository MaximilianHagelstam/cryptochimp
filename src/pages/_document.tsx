import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="h-full bg-main">
      <Head />
      <body className="h-full text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
