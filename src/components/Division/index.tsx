import React from "react";
import Head from "next/head";
import { DivisionContent } from "~/components/Division/content";

interface DivisionProps {}

export const Division: React.FC<DivisionProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Division</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="">
        <h1 className="">Divison</h1>
      </header>

      <main className="">
        <DivisionContent />
      </main>
    </div>
  );
};
