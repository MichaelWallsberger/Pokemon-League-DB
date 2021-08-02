import { PokemonReroll, PokemonTypes, TimeEvent, Type } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createPokemonReroll,
  iPokemon,
  iTrainer,
  usePokemons,
  useTimeEvent,
  useTrainer,
} from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { Error } from "~/components/ui/Error";
import { SaveButton } from "~/components/ui/SaveButton";
import typeColors from "~/styles/typeColors";
import { types } from "~/utils/utilites";

interface AddRerollProps {
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const AddReroll: React.FC<AddRerollProps> = ({ setTab }) => {
  const { register, handleSubmit } = useForm();
  const { data: eventData, error: eventError } = useTimeEvent();
  const { data: trainerData, error: trainerError } = useTrainer();
  const { data: pokemonData, error: pokemonError } = usePokemons();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeType, setActiveType] = useState<string>(types[0].name);
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const addReroll: PokemonReroll = {
      id: -1,
      timeEventname: e.event,
      trainerName: e.trainer,
      typeName: e.type,
      prevPokemon: e.prevP,
      newPokemon: e.newP,
    };

    createPokemonReroll(addReroll).then((text: string) => {
      if (text != "success") {
        setErrorMessage(text);
        setShowError(true);
      } else {
        setTab("");
      }

      setWhileSubmit(false);
    });
  };

  return (
    <div className="mx-10">
      {showError && <Error text={errorMessage} setShowError={setShowError} />}

      <div className="flex justify-between">
        <BackButton setTab={() => setTab("")} />
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex lg:justify-center gap-10 mb-5 lg:mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Match Event</div>

              {!eventData && !eventError && <div className="bg-gray-100">Loading Events...</div>}

              {eventError && <div className="text-center w-full">Error loading Events 😞</div>}

              {eventData && (
                <select className="px-1 w-full" {...register("event")}>
                  {eventData.map((event: TimeEvent) => {
                    return (
                      <option key={event.event} value={event.event}>
                        {event.event}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Trainer</div>
              {!trainerData && !trainerError && (
                <div className="bg-gray-100">Loading trainers...</div>
              )}

              {trainerError && <div className="text-center w-full">Error loading Trainers 😞</div>}

              {trainerData && (
                <select className="px-1 w-full" {...register("trainer")}>
                  {trainerData.map((trainer: iTrainer) => {
                    return (
                      <option key={trainer.name} value={trainer.name}>
                        {trainer.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div
              className="mb-5 bg-brand p-2 rounded-lg lg:w-36"
              style={{ backgroundColor: typeColors[activeType?.toLowerCase()] }}
            >
              <div className="font-bold mb-1">Types</div>
              {/* {!typeData && !typeError && (
                <div className="bg-gray-100">Loading types...</div>
              )}

              {typeError && <div className="text-center w-full">Error loading Types 😞</div>} */}

              {types && (
                <select
                  className="px-1 w-full"
                  {...register("type")}
                  onChange={(e) => {
                    setActiveType(e.target.value);
                  }}
                >
                  {types.map((type: Type) => {
                    return (
                      <option
                        key={type.name}
                        value={type.name}
                        style={{
                          backgroundColor: typeColors[type.name.toLowerCase()],
                          fontFamily: '"Roboto", sans-serif',
                          color: "white",
                        }}
                      >
                        {type.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>

          {/* Pokemon Reroll */}
          <div className="lg:flex lg:justify-center gap-10 mb-5 lg:mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Prev-Pokemon</div>
              {!pokemonData && !pokemonError && (
                <div className="bg-gray-100">Loading pokemons...</div>
              )}

              {pokemonError && <div className="text-center w-full">Error loading Pokemns 😞</div>}

              {pokemonData && (
                <select className="px-1 w-full" {...register("prevP")}>
                  {/* add pokemon if it has the type */}
                  {pokemonData.map((pokemon: iPokemon) => {
                    if (
                      pokemon.types.some(
                        (ptype: PokemonTypes) =>
                          ptype.type.toLowerCase() === activeType.toLowerCase()
                      )
                    )
                      return (
                        <option key={pokemon.name} value={pokemon.id}>
                          {pokemon.nameDisplay}
                        </option>
                      );
                  })}
                </select>
              )}
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">New-Pokemon</div>
              {!pokemonData && !pokemonError && (
                <div className="bg-gray-100">Loading pokemons...</div>
              )}

              {pokemonError && <div className="text-center w-full">Error loading Pokemns 😞</div>}

              {pokemonData && (
                <select className="px-1 w-full" {...register("newP")}>
                  {/* add pokemon if it has the type */}
                  {pokemonData.map((pokemon: iPokemon) => {
                    if (
                      pokemon.types.some(
                        (ptype: PokemonTypes) =>
                          ptype.type.toLowerCase() === activeType.toLowerCase()
                      )
                    )
                      return (
                        <option key={pokemon.name} value={pokemon.id}>
                          {pokemon.nameDisplay}
                        </option>
                      );
                  })}
                </select>
              )}
            </div>
          </div>

          <SaveButton text={"Add"} onSubmit={whileSubmit} disabled={whileSubmit} />
        </form>
      </div>
    </div>
  );
};
