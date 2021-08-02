import { PokemonReroll } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { TrainerPokemonRerolls, useTrainerRerolls } from "~/api";
import { Loading } from "../ui/Loading";
import { TrainerInterfaceExpanded } from "./reroll";
import { TrainerPokemon } from "./trainerPokemon";

interface TrainerRerollProps {
  trainer: TrainerInterfaceExpanded;
}

export const TrainerReroll: React.FC<TrainerRerollProps> = ({ trainer }) => {
  const [rerollData, setRerollData] = useState<TrainerPokemonRerolls>();

  const { data, error: rerollError } = useTrainerRerolls(trainer.name);

  useEffect(() => {
    if (rerollData != undefined || data == undefined) return;

    data.PokemonRerolls.sort(function (a, b) {
      return a.timeEvent.index - b.timeEvent.index;
    });

    setRerollData(data);
  }, [data]);

  return (
    <>
      {rerollData == undefined && <Loading translateY={"-25px"} />}

      {rerollData != undefined &&
        rerollData.PokemonRerolls.map((pokemonReroll) => {
          return (
            <TrainerPokemon
              key={pokemonReroll.id}
              timeEventName={pokemonReroll.timeEventname}
              type={pokemonReroll.typeName}
              prevPokemon={pokemonReroll.prevP}
              newPokemon={pokemonReroll.newP}
            />
          );
        })}
    </>
  );
};
