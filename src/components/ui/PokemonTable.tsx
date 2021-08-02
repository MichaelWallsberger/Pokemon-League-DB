import React from "react";
import { iTrainerPokemons } from "~/api";
import typeColors from "~/styles/typeColors";
import { PokemonSrite } from "./PokemonSprite";

interface PokemonTableProps {
  pokemons: iTrainerPokemons[];
  type?: boolean;
  sprite?: boolean;
  pokename?: boolean;
  kills?: boolean;
}

export const PokemonTable: React.FC<PokemonTableProps> = ({
  pokemons,
  type = true,
  sprite = true,
  pokename = true,
  kills = true,
}) => {
  return (
    <table className="max-w-max mt-2 pb-2 block md:table overflow-x-auto">
      <thead className="bg-red-400 h-10">
        <tr>
          {type && (
            <th className="px-4" style={{ minWidth: "5rem" }}>
              Type
            </th>
          )}
          {sprite && (
            <th className="" style={{ minWidth: "2rem" }}>
              Sprite
            </th>
          )}
          {pokename && <th className="text-left pl-4">Pokemon</th>}
          {kills && (
            <th className="" style={{ minWidth: "5rem" }}>
              Kills
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {pokemons.map((trainerPokemon: iTrainerPokemons) => {
          return (
            <tr key={trainerPokemon.typeName} className="tablerow-pokemon h-12">
              {type && (
                <td className="text-center px-4 w-24">
                  <p
                    className="text-sm font-bold tracking-wider text-white"
                    style={{
                      backgroundColor: typeColors[trainerPokemon.typeName.toLowerCase()],
                      padding: "0.35rem",
                      width: "5rem",
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    {trainerPokemon.typeName}
                  </p>
                </td>
              )}
              {sprite && (
                <td>
                  <PokemonSrite pokemon={trainerPokemon.pokemon} />
                </td>
              )}
              {pokename && <td className="pl-4 w-36">{trainerPokemon.pokemon.nameDisplay}</td>}
              {kills && <td className="text-center">{trainerPokemon.kills}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
