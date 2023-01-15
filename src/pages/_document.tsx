import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="h-full bg-slate-50">
      <Head />
      <body className="h-full text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
