import React, { useState } from "react";
import Head from "next/head";
import { iPokemon, usePokemons } from "~/api";
import { Loading } from "../../ui/Loading";
import { PokemonTypes } from "@prisma/client";
import typeColors from "~/styles/typeColors";
import { AddPokemon } from "./AddPokemon";
import { EditPokemon } from "./EditPokemon";
import { EditCard } from "~/components/ui/EditCard";
import { AddButton } from "~/components/ui/AddButton";

interface PokemonListProps {}

export const PokemonList: React.FC<PokemonListProps> = () => {
  const { data: pokemonData, error: pokemonError } = usePokemons();
  const [tab, setTab] = useState<string>("");
  const [pokemon, setPokemon] = useState<iPokemon>();

  /* loading Data */
  if (!pokemonData) {
    return (
      <div className="mb-10">
        <div className="text-center">Loading Pokemon from DB</div>
        <Loading />
      </div>
    );
  }

  /* Error occured */
  if (pokemonError) {
    return (
      <div className="text-center text-xl text-red-500 mb-10">
        Error occured when loading Pokemon from DB
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Edit Pokemon</title>
      </Head>

      <header className=""></header>

      <main className="mt-8">
        {/* show data */}
        {tab === "" && (
          <div>
            {/* Add Pokemon */}
            <AddButton text={"Add Pokemon"} setTab={() => setTab("add")} />

            {/* Pokemon */}
            <div
              className="text-center grid gap-2 justify-items-center"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)" }}
            >
              {/* todo -> only list a set amount of pokemons | maybe search by types, name, generation */}
              {pokemonData.map((poke: iPokemon) => {
                return (
                  <EditCard
                    key={poke.id}
                    keyCard={poke.id}
                    onClick={() => {
                      setPokemon(poke);
                      setTab("edit");
                    }}
                    header={`${poke.nameDisplay}`}
                    subtext={
                      <div className="flex justify-center gap-4">
                        {poke.types.map((type: PokemonTypes) => {
                          return (
                            <p
                              key={type.type}
                              className="font-bold tracking-wider text-white py-1 px-3 rounded-xl text-xs"
                              style={{
                                fontFamily: '"Roboto", sans-serif',
                                backgroundColor: typeColors[type.type.toLowerCase()],
                              }}
                            >
                              {type.type}
                            </p>
                          );
                        })}
                      </div>
                    }
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* edit rule */}
        {tab === "edit" && <EditPokemon pokemon={pokemon} setTab={setTab} />}
        {/* add rule */}
        {tab === "add" && <AddPokemon setTab={setTab} />}
      </main>
    </div>
  );
};
