import React from "react";
import Head from "next/head";
import { MatchContent } from "./matches";

interface MatchProps {}

export const Match: React.FC<MatchProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Matches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="">
        <h1 className="">Matches</h1>
      </header>

      <main className="">
        <MatchContent />
      </main>
    </div>
  );
};
