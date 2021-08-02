import React from "react";
import { iTrainer } from "~/api";
import { PokemonTable } from "../../ui/PokemonTable";

interface ParticipantPokemonTableProps {
  trainer: iTrainer;
}

export const ParticipantPokemonTable: React.FC<ParticipantPokemonTableProps> = ({ trainer }) => {
  return (
    <div
      className="rounded-xl p-2 max-w-sm mx-auto border-solid"
      style={{
        backgroundColor: trainer.division.backgroundColor,
        borderColor: trainer.division.borderColor,
        borderWidth: "3px",
      }}
    >
      <h2 className="text-center my-2 pb-4" style={{ borderBottom: "3px dashed white" }}>
        <p className="font-bold text-xl md:text-2xl">{trainer.name}</p>
        <p className="text-gray-600 text-sm md:text-base">{trainer.discordName}</p>
        <div className="flex justify-center text-gray-600 gap-1">
          <p className="text-sm md:tex-base">{trainer.teamNr}.</p>
          <p className="text-sm md:tex-base">{trainer.division.header}</p>
        </div>
      </h2>

      <PokemonTable pokemons={trainer.TrainerPokemons} />
    </div>
  );
};
