import "../styles/globals.css";
import Head from "next/head";
import Website from "~/components/Website";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <Website Component={Component} pageProps={pageProps} />
    </>
  );
}

export default MyApp;
