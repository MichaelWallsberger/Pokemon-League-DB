import React, { useState } from "react";
import Head from "next/head";
import { useRules } from "~/api";
import { Loading } from "../../ui/Loading";
import { Rule } from "@prisma/client";
import { EditRule } from "./EditRule";
import { AddRule } from "./AddRule";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface RuleListProps {}

const createShortText = (text: string): string => {
  let temp = text.substring(0, 100);

  if (text.length > 100) temp += "...";

  return temp;
};

export const RulesList: React.FC<RuleListProps> = () => {
  const { data: ruleData, error: ruleError } = useRules();
  const [tab, setTab] = useState<string>("");
  const [rule, setRule] = useState<Rule>();

  /* loading Data */
  if (!ruleData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading rules from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (ruleError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Rules from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Rules</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Rules */}
            <AddButton text={"Add Rule"} setTab={() => setTab("add")} />

            {/* Rules */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {ruleData.map((rule: Rule) => {
                return (
                  <EditCard
                    key={rule.id}
                    keyCard={rule.id}
                    onClick={() => {
                      setRule(rule);
                      setTab("edit");
                    }}
                    header={`${rule.index}. ${rule.title}`}
                    subtext={createShortText(rule.text)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* edit rule */}
        {tab === "edit" && <EditRule rule={rule} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddRule setTab={setTab} />}
      </main>
    </div>
  );
};
