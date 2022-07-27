import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // Thêm vào ` lang="cn" `
    <Html lang="cn">
      <Head />
      {/* Thêm vào ` className="bg-dark" ` */}
      <body className="bg-dark">
        {/* Thêm vào <div> portal */}
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
