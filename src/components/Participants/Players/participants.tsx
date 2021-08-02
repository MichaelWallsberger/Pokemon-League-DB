import React, { useEffect, useState } from "react";
import { iTrainer, useTrainer } from "~/api";
import { Loading } from "~/components/ui/Loading";
import classNames from "classnames";
import { ParticipantPokemonTable } from "./tablecard";

interface ParticipantsProps {}

export const ParticipantsContent: React.FC<ParticipantsProps> = () => {
  const [activeTrainer, setActiveTrainer] = useState<iTrainer>();
  const { data: trainerData, error: trainerError } = useTrainer();

  // set first trainer when nothing is selected
  useEffect(() => {
    if (trainerData != null && trainerData[0] != null && activeTrainer == undefined) {
      setActiveTrainer(trainerData[0]);
    }
  }, [trainerData]);

  if (trainerError != null) return <div>Error loading Participants... 😠</div>;
  if (trainerData == null) return <Loading />;

  return (
    trainerData != null && (
      <>
        {/* trainer buttons */}
        <div className="mb-12">
          {trainerData.map((trainer: iTrainer) => {
            return (
              <button
                key={trainer.name}
                className={classNames(
                  "mx-2 my-1 p-2 rounded hover:bg-red-400 generator-btn",
                  trainer.name == activeTrainer?.name
                    ? "generator-btn-active bg-red-400"
                    : "generator-btn-inactive bg-gray-700"
                )}
                onClick={() => setActiveTrainer(trainer)}
              >
                {trainer.name}
              </button>
            );
          })}
        </div>

        {/* trainer table */}
        {activeTrainer != undefined && <ParticipantPokemonTable trainer={activeTrainer} />}
      </>
    )
  );
};
