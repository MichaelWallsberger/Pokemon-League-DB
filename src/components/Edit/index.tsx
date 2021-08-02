import React, { useState } from "react";
import Head from "next/head";
import classNames from "classnames";
import { RulesList } from "./Rules/RuleList";
import { DivisionList } from "./Division/DivisionList";
import { TrainerList } from "./Trainer/TrainerList";
import { MatchList } from "./Match/MatchList";
import { RerollList } from "./Reroll/RerollList";
import { EventList } from "./Event/EventList";
import { PokemonList } from "./Pokemon/PokemonList";
import { User } from "@prisma/client";
import Login from "~/pages/login";

interface EditProps {}

// Tab
interface Tab {
  name: string;
  filter: string;
}
const tabs: Tab[] = [
  { name: "Trainers", filter: "trainer" },
  { name: "Matches", filter: "match" },
  { name: "Rerolls", filter: "reroll" },
  { name: "Divisons", filter: "division" },
  { name: "Rules", filter: "rule" },
  { name: "Event", filter: "event" },
  { name: "Pokemon", filter: "pokemon" },
];

export const Edit: React.FC<EditProps> = () => {
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);
  const [user, setUser] = useState<User>();

  const renderTab = (tabName: string) => {
    switch (tabName) {
      case "trainer": {
        return <TrainerList />;
      }
      case "match": {
        return <MatchList />;
      }
      case "reroll": {
        return <RerollList />;
      }
      case "division": {
        return <DivisionList />;
      }
      case "rule": {
        return <RulesList />;
      }
      case "event": {
        return <EventList />;
      }
      case "pokemon": {
        return <PokemonList />;
      }
      default: {
        return <div>Something...</div>;
      }
    }
  };

  return (
    <div className="">
      <Head>
        <title>Edit League</title>
      </Head>

      {!user && <Login setUser={setUser} />}

      {user && (
        <>
          <header className="">
            <h1 className="">Edit</h1>
          </header>

          <main className="">
            {/* tabs */}
            <div className="my-4 ">
              <nav
                className="relative z-0 rounded-lg overflow-hidden 
          shadow flex divide-x divide-gray-800 border-2 border-gray"
              >
                {tabs.map((tab) => {
                  return (
                    <div
                      onClick={() => setActiveComponent(tab)}
                      key={tab.name}
                      style={{
                        fontFamily: '"Roboto", sans-serif',
                      }}
                      className={classNames(
                        tab.name === activeComponent.name
                          ? "text-gray-100"
                          : "text-gray-300 hover:text-gray-100",
                        "cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-gray-800 py-4 px-4 text-sm font-medium hover:bg-gray-700 focus:z-10"
                      )}
                    >
                      <div className="flex items-center justify-center space-x-4">
                        {/* <tab.icon className="block h-6 w-6" aria-hidden="true" /> */}
                        <div className="">{tab.name}</div>
                      </div>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.name === activeComponent.name ? "bg-red-500" : "bg-transparent",
                          "absolute inset-x-0 bottom-0 h-1.5"
                        )}
                      />
                    </div>
                  );
                })}
              </nav>
            </div>
            {/* display of settings */}
            <div>{renderTab(activeComponent.filter)}</div>
          </main>
        </>
      )}
    </div>
  );
};
