import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Accordion } from "../ui/Accordion";
import { iTimeEvent, iTimeEventPokemonReroll, useRerolls, useTrainer } from "~/api";
import { PokemonReroll, Trainers } from "@prisma/client";
import { WeekReroll } from "./week";
import { TrainerReroll } from "./trainer";
import { Loading } from "../ui/Loading";

interface RerollsProps {}

interface TimeEventExpanded extends iTimeEvent {
  expanded: boolean;
}

export interface TrainerInterfaceExpanded extends Trainers {
  expanded: boolean;
}

const rerollWeekConent = (reroll: TimeEventExpanded) => {
  return (
    <div className="poke-reroll-week-container">
      {reroll.PokemonRerolls.map((re: iTimeEventPokemonReroll) => {
        return <WeekReroll key={re.id} reroll={re} />;
      })}
    </div>
  );
};

const rerollTrainerContent = (trainer: TrainerInterfaceExpanded) => {
  return (
    <div className="poke-reroll-trainer-container">
      <TrainerReroll trainer={trainer} />
    </div>
  );
};

// Tab
interface Tab {
  name: string;
  filter: string;
}
const tabs: Tab[] = [
  { name: "Week", filter: "week" },
  { name: "Trainer", filter: "trainer" },
];

export const RerollContent: React.FC<RerollsProps> = () => {
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);
  const [pokemonRerolls, setPokemonRerolls] = useState<TimeEventExpanded[]>([]);
  const [trainerRerolls, setTrainerRerolls] = useState<TrainerInterfaceExpanded[]>([]);

  const { data: rerollData, error: rerollError } = useRerolls();
  const { data: trainerData, error: trainerError } = useTrainer();

  useEffect(() => {
    // weeks
    rerollData?.forEach((timeEvent) => {
      const expandedReroll: TimeEventExpanded = {
        ...timeEvent,
        expanded: false,
      };
      setPokemonRerolls((timeEvent) => [...timeEvent, expandedReroll]);
    });
  }, [rerollData]);

  useEffect(() => {
    // trainer
    trainerData?.forEach((trainer: Trainers) => {
      const expandedTrainer: TrainerInterfaceExpanded = {
        ...trainer,
        expanded: false,
      };
      setTrainerRerolls((trainers) => [...trainers, expandedTrainer]);
    });
  }, [trainerData]);

  const renderTab = (tabName: string) => {
    switch (tabName) {
      case "week": {
        // loading data
        if (rerollData == undefined) {
          return <Loading />;
        }

        return pokemonRerolls.map((reroll: TimeEventExpanded) => {
          return (
            <Accordion
              key={reroll.event}
              header={`${reroll.event}`}
              content={rerollWeekConent(reroll)}
            />
          );
        });
      }
      case "trainer": {
        // loading data
        if (trainerData == undefined) {
          return <Loading />;
        }

        return trainerRerolls.map((trainer: TrainerInterfaceExpanded) => {
          return (
            <Accordion
              key={trainer.name}
              header={`${trainer.name}`}
              content={rerollTrainerContent(trainer)}
            />
          );
        });
      }
    }
  };

  if (rerollError != null || trainerError != null)
    return <div>Error loading Rerolls or Trainer... 😠</div>;

  return (
    <div className="">
      <main className="participants-participants">
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
    </div>
  );
};
