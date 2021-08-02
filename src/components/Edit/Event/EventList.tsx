import React, { useState } from "react";
import Head from "next/head";
import { useTimeEvent } from "~/api";
import { Loading } from "../../ui/Loading";
import { TimeEvent } from "@prisma/client";
import { AddEvent } from "./AddEvent";
import { EditEvent } from "./EditEvent";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface EventListProps {}

export const EventList: React.FC<EventListProps> = () => {
  const { data: eventData, error: eventError } = useTimeEvent();
  const [tab, setTab] = useState<string>("");
  const [eventTime, setEventTime] = useState<TimeEvent>();

  /* loading Data */
  if (!eventData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading events from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (eventError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Events from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Event</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Event */}
            <AddButton text={"Add Event"} setTab={() => setTab("add")} />

            {/* Event */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {eventData.map((event: TimeEvent) => {
                return (
                  <EditCard
                    key={event.event}
                    keyCard={event.event}
                    onClick={() => {
                      setEventTime(event);
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
        {tab === "edit" && <EditEvent event={eventTime} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddEvent setTab={setTab} />}
      </main>
    </div>
  );
};
