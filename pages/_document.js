import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {/* Thêm vào portal */}
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
