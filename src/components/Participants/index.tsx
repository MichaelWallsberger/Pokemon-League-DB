import React, { useState } from "react";
import Head from "next/head";
import { ParticipantsContent } from "./Players/participants";
import classNames from "classnames";
import { VsMode } from "./VS/VsMode";

interface ParticipantsProps {}

// Tab
interface Tab {
  name: string;
  filter: string;
  phoneHide: boolean;
}
const tabs: Tab[] = [
  { name: "Players", filter: "player", phoneHide: false },
  { name: "VS", filter: "vs", phoneHide: true },
];

const renderTab = (tabName: string) => {
  switch (tabName) {
    case "player": {
      return <ParticipantsContent />;
    }
    case "vs": {
      return <VsMode />;
    }
  }
};

export const Participants: React.FC<ParticipantsProps> = () => {
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);

  return (
    <div className="">
      <Head>
        <title>Participants</title>
      </Head>

      <header className="">
        <h1 className="">Participants</h1>
      </header>

      <main className="participants-participants">
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
                    tab.phoneHide ? "hidden sm:block" : "",
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
        <>{renderTab(activeComponent.filter)}</>
      </main>
    </div>
  );
};
