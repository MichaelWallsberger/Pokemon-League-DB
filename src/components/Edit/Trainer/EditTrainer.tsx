import { Division } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteTrainer,
  iPokemon,
  iTrainer,
  TrainerWithTrainerPokemons,
  updateTrainer,
  useDivision,
  usePokemonsWithOrder,
} from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { DeleteButton } from "~/components/ui/DeleteButton";
import { Error } from "~/components/ui/Error";
import { Modal } from "~/components/ui/Modal";
import { SaveButton } from "~/components/ui/SaveButton";
import { Success } from "~/components/ui/Success";
import typeColors from "~/styles/typeColors";
import { checkIndexValue, types } from "~/utils/utilites";

interface EditTrainerProps {
  trainer: iTrainer;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface ErrorMessage {
  show: boolean;
  message: string;
}

export const EditTrainer: React.FC<EditTrainerProps> = ({ trainer, setTab }) => {
  const { register, handleSubmit } = useForm();
  const { data: divisionData, error: divisionError } = useDivision();
  const { data: pokemonData, error: pokemonError } = usePokemonsWithOrder("name");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [indexError, setIndexError] = useState<ErrorMessage>({ show: false, message: "" });
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);
  const [whileDelete, setWhileDelete] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const utp: TrainerWithTrainerPokemons = {
      name: e.name,
      discordName: e.discordName,
      imgUrl: "",
      teamNr: e.teamNr,
      divisionName: e.division,
      TrainerPokemons: [
        { pokemonId: e.Bug, typeName: "Bug", kills: e.BugKills },
        { pokemonId: e.Dark, typeName: "Dark", kills: e.DarkKills },
        { pokemonId: e.Dragon, typeName: "Dragon", kills: e.DragonKills },
        {
          pokemonId: e.Electric,
          typeName: "Electric",
          kills: e.ElectricKills,
        },
        { pokemonId: e.Fairy, typeName: "Fairy", kills: e.FairyKills },
        {
          pokemonId: e.Fighting,
          typeName: "Fighting",
          kills: e.FightingKills,
        },
        { pokemonId: e.Fire, typeName: "Fire", kills: e.FireKills },
        { pokemonId: e.Flying, typeName: "Flying", kills: e.FlyingKills },
        { pokemonId: e.Ghost, typeName: "Ghost", kills: e.GhostKills },
        { pokemonId: e.Grass, typeName: "Grass", kills: e.GrassKills },
        { pokemonId: e.Ground, typeName: "Ground", kills: e.GroundKills },
        { pokemonId: e.Ice, typeName: "Ice", kills: e.IceKills },
        { pokemonId: e.Normal, typeName: "Normal", kills: e.NormalKills },
        { pokemonId: e.Poison, typeName: "Poison", kills: e.PoisonKills },
        { pokemonId: e.Psychic, typeName: "Psychic", kills: e.PsychicKills },
        { pokemonId: e.Rock, typeName: "Rock", kills: e.RockKills },
        { pokemonId: e.Steel, typeName: "Steel", kills: e.SteelKills },
        { pokemonId: e.Water, typeName: "Water", kills: e.WaterKills },
      ],
    };

    updateTrainer(utp, trainer.name).then((e) => {
      // error occured
      if (e != "success") {
        setErrorMessage(e);
        setShowError(true);
      }
      // success
      else {
        setShowSuccess(true);
      }

      setWhileSubmit(false);
    });
  };

  const delTrainer = () => {
    setWhileDelete(true);

    deleteTrainer(trainer.name).then((e) => {
      // error occured
      if (e != "success") {
        setErrorMessage(e);
        setShowError(true);
      }
      // success
      else {
        setTab("");
      }

      setWhileDelete(false);
    });
  };

  return (
    <div className="mx-10">
      <div className="flex justify-between">
        <BackButton setTab={() => setTab("")} />

        <DeleteButton
          text={"Delete"}
          onSubmit={whileDelete}
          setShowModal={() => setShowModal(true)}
          disabled={whileDelete || whileSubmit}
        />
      </div>
      <Modal
        title={`Delete: ${trainer.name}`}
        text={"This will perment delete this Item."}
        showModal={showModal}
        setShowModal={setShowModal}
        onSucess={delTrainer}
        color={"red"}
      />
      {showSuccess && (
        <Success
          text={"The ants successfully carried the operration across the glob."}
          setShowSuccess={setShowSuccess}
        />
      )}
      {showError && <Error text={errorMessage} setShowError={setShowError} />}
      <div className="mt-5">
        <form className="lg:mx-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-brand p-2 rounded-lg mb-5">
            <div className="font-bold mb-1">Name</div>
            <input
              className="px-1 w-full"
              defaultValue={trainer.name}
              {...register("name")}
            ></input>
          </div>

          <div className="bg-brand p-2 rounded-lg mb-5">
            <div className="font-bold mb-1">DiscordName</div>
            <input
              className="px-1 w-full"
              defaultValue={trainer.discordName}
              {...register("discordName")}
            ></input>
          </div>

          <div className="mb-5 bg-brand p-2 rounded-lg">
            <div className="font-bold mb-1">TeamNr.</div>
            <input
              className="px-1 w-full"
              {...register("teamNr")}
              defaultValue={trainer.teamNr}
              onChange={(e) => checkIndexValue(e.target.value, setIndexError)}
            ></input>
            {indexError.show && <p className="text-red-500 text-center">{indexError.message}</p>}
          </div>

          <div className="mb-5 bg-brand p-2 rounded-lg">
            <div className="font-bold mb-1">Division</div>

            {!divisionData && !divisionError && (
              <div className="w-full bg-gray-100">Loading Division...</div>
            )}

            {divisionError && <div className="text-center w-full">Error loading Division 😞</div>}

            {divisionData && (
              <select
                className="px-1 w-full"
                defaultValue={trainer.divisionName}
                {...register("division")}
              >
                {divisionData.map((division: Division) => {
                  return (
                    <option key={division.name} value={division.name}>
                      {division.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {/* Pokemons */}
          <div className="mb-10">
            <div className="text-center font-bold text-xl mb-5">Pokemons</div>

            {!pokemonData && !pokemonError && (
              <div className="w-full bg-gray-100">Loading Pokemons...</div>
            )}

            {pokemonError && <div className="text-center w-full">Error loading Pokemons 😞</div>}

            {pokemonData && (
              <div className="mb-10">
                {types.map((type) => {
                  return (
                    <div key={type.name} className="flex gap-2 md:gap-8 lg:gap-12">
                      <div
                        className="mb-5 p-2 rounded-lg w-full"
                        style={{ backgroundColor: typeColors[type.name.toLowerCase()] }}
                      >
                        <div className="font-bold mb-1">{type.name}</div>

                        <select
                          className="px-1 w-full"
                          // todo -> reactivate function
                          defaultValue={
                            trainer.TrainerPokemons.find(
                              (poke) => poke.typeName.toLowerCase() === type.name.toLowerCase()
                            ).pokemon.id
                          }
                          {...register(type.name)}
                        >
                          {/* add pokemon if it has the type */}
                          {/* change if only pokemon with the type should only be shown */}
                          {pokemonData.map((pokemon: iPokemon) => {
                            //   if (
                            //     pokemon.types.some(
                            //       (ptype: PokemonTypes) =>
                            //         ptype.type.toLowerCase() === type.name.toLowerCase()
                            //     )
                            //   )
                            //     return (
                            //       <option key={pokemon.name} value={pokemon.id}>
                            //         {pokemon.nameDisplay}
                            //       </option>
                            //     );
                            // })}
                            return (
                              <option key={pokemon.name} value={pokemon.id}>
                                {pokemon.nameDisplay}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="mb-5 bg-brand p-2 rounded-lg">
                        <div className="font-bold mb-1">Kills</div>
                        <input
                          className="px-1 w-full"
                          {...register(`${type.name}Kills`)}
                          // reactivate function
                          defaultValue={
                            trainer.TrainerPokemons.find(
                              (poke) => poke.typeName.toLowerCase() === type.name.toLowerCase()
                            ).kills
                          }
                          placeholder={"0"}
                        ></input>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <SaveButton text={"Save"} onSubmit={whileSubmit} disabled={whileDelete || whileSubmit} />
        </form>
      </div>
    </div>
  );
};
