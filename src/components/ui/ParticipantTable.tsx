import React from "react";
import { iTrainer } from "~/api";
import { PokemonTable } from "./PokemonTable";

interface ParticipantTableProps {
  trainerData: iTrainer[];
  trainer: iTrainer;
  setTrainer: React.Dispatch<React.SetStateAction<iTrainer>>;
}

export const ParticipantTable: React.FC<ParticipantTableProps> = ({
  trainerData,
  trainer,
  setTrainer,
}) => {
  return (
    <div
      className="rounded-xl p-2 max-w-sm border-solid mx-auto sm:mx-0"
      style={{
        backgroundColor: trainer.division.backgroundColor,
        borderColor: trainer.division.borderColor,
        borderWidth: "3px",
      }}
    >
      <p className="text-center my-2 pb-4" style={{ borderBottom: "3px dashed white" }}>
        {/* Trainer Data */}
        <select className="" onChange={(e) => setTrainer(JSON.parse(e.target.value))}>
          {trainerData.map((trainer: iTrainer) => {
            return (
              <option key={trainer.name} value={JSON.stringify(trainer)}>
                {trainer.name}
              </option>
            );
          })}
        </select>
      </p>

      <PokemonTable pokemons={trainer.TrainerPokemons} type={false} kills={false} />
    </div>
  );
};
