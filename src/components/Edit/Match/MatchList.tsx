import React, { useState } from "react";
import Head from "next/head";
import { TimeEventTrainerMatches, useEventWithTrainerMatches } from "~/api";
import { Loading } from "../../ui/Loading";
import { TrainerMatch } from "@prisma/client";
import { AddMatch } from "./AddMatch";
import { EditMatches } from "./EditMatches";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface MatchListProps {}

export const MatchList: React.FC<MatchListProps> = () => {
  const { data: eventData, error: eventError } = useEventWithTrainerMatches();
  const [tab, setTab] = useState<string>("");
  const [event, setEvent] = useState<TimeEventTrainerMatches>();

  /* loading Data */
  if (!eventData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading matches from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (eventError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Matches from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Matches</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Match */}
            <AddButton text={"Add Match"} setTab={() => setTab("add")} />

            {/* Match */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {eventData.map((event: TimeEventTrainerMatches) => {
                return (
                  <EditCard
                    key={event.event}
                    keyCard={event.event}
                    onClick={() => {
                      setEvent(event);
                      setTab("edit");
                    }}
                    header={`${event.index}. ${event.event}`}
                    subtext={`${event.header}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* edit rule */}
        {tab === "edit" && <EditMatches event={event} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddMatch setTab={setTab} />}
      </main>
    </div>
  );
};
