import React from "react";
import Head from "next/head";
import { RerollContent } from "./reroll";

interface RerollsProps {}

export const Rerolls: React.FC<RerollsProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Pokemon Rerolls</title>
      </Head>

      <header className="participants-container">
        <h1 className="">Pokemon Rerolls</h1>
      </header>

      <main className="participants-participants">
        <RerollContent />
      </main>
    </div>
  );
};
