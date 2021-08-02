import React, { useState } from "react";
import Head from "next/head";
import { iTrainer, useTrainer } from "~/api";
import { Loading } from "../../ui/Loading";
import { AddTrainer } from "./AddTrainer";
import { EditTrainer } from "./EditTrainer";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface TrainerListProps {}

const createShortText = (text: string): string => {
  let temp = text.substring(0, 100);

  if (text.length > 100) temp += "...";

  return temp;
};

export const TrainerList: React.FC<TrainerListProps> = () => {
  const { data: trainerData, error: trainerError } = useTrainer();
  const [tab, setTab] = useState<string>("");
  const [trainer, setTrainer] = useState<iTrainer>();

  /* loading Data */
  if (!trainerData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading trainers from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (trainerError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Trainers from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Trainers</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Trainer */}
            <AddButton text={"Add Trainer"} setTab={() => setTab("add")} />

            {/* Trainer */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {trainerData.map((trainer: iTrainer) => {
                return (
                  <EditCard
                    key={trainer.name}
                    keyCard={trainer.name}
                    onClick={() => {
                      setTrainer(trainer);
                      setTab("edit");
                    }}
                    header={`${trainer.teamNr}. ${trainer.name}`}
                    subtext={`${trainer.discordName}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* edit rule */}
        {tab === "edit" && <EditTrainer trainer={trainer} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddTrainer setTab={setTab} />}
      </main>
    </div>
  );
};
