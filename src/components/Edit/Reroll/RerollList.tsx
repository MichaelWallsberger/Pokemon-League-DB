import React, { useState } from "react";
import Head from "next/head";
import { iTimeEvent, useRerolls } from "~/api";
import { Loading } from "../../ui/Loading";
import { AddReroll } from "./AddReroll";
import { EditWeekReroll } from "./EditWeekReroll";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface RerollListProps {}

export const RerollList: React.FC<RerollListProps> = () => {
  const { data: rerollData, error: rerollError } = useRerolls();
  const [tab, setTab] = useState<string>("");
  const [week, setWeek] = useState<iTimeEvent>();

  /* loading Data */
  if (!rerollData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading rerolls from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (rerollError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Rerolls from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Rerolls</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Reroll */}
            <AddButton text={"Add Reroll"} setTab={() => setTab("add")} />

            {/* Reroll */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {rerollData.map((reroll: iTimeEvent) => {
                return (
                  <EditCard
                    key={reroll.event}
                    keyCard={reroll.event}
                    onClick={() => {
                      setWeek(reroll);
                      setTab("edit");
                    }}
                    header={`${reroll.index}. ${reroll.event}`}
                    subtext={`${reroll.header}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* edit rule */}
        {tab === "edit" && <EditWeekReroll week={week} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddReroll setTab={setTab} />}
      </main>
    </div>
  );
};
