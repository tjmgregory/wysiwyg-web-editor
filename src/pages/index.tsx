import { type NextPage } from "next";
import Head from "next/head";
import Editor from "../components/Editor";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WYSIWYG Editor</title>
        <meta name="description" content="Create websites with drag and drop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Editor />
    </>
  );
};

export default Home;
