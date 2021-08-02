import React from "react";
import Head from "next/head";
import { RuleContent } from "./rule";

interface RulesProps {}

export const Rules: React.FC<RulesProps> = () => {
  return (
    <div className="">
      <Head>
        <title>Rules</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="">
        <h1 className="">Rules</h1>
      </header>

      <main className="">
        <RuleContent />
      </main>
    </div>
  );
};
