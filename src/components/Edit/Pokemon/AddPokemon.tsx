import { Pokemon, Type } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createPokemon, PokemonWithTypes } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { Error } from "~/components/ui/Error";
import { SaveButton } from "~/components/ui/SaveButton";
import typeColors from "~/styles/typeColors";
import { types } from "~/utils/utilites";

interface AddPokemonProps {
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const AddPokemon: React.FC<AddPokemonProps> = ({ setTab }) => {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeType1, setActiveType1] = useState<string>(types[0].name);
  const [activeType2, setActiveType2] = useState<string>();
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const p: PokemonWithTypes = {
      id: -1,
      name: e.name,
      nameDisplay: e.displayName,
      dexNr: e.dexNr,
      generation: e.generation,
      spriteSuffix: e.spriteSuffix,
      color: e.color,
      isNfe: e.isNfe,
      isUber: e.isUber,
      isForm: e.isForm,
      type1: e.type1,
      type2: e.type2,
    };

    createPokemon(p).then((text: string) => {
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
          <div className="lg:flex lg:justify-center gap-4 mb-5 lg:mb-5">
            <div className="bg-brand p-2 rounded-lg mb-5">
              <div className="font-bold mb-1">Name</div>
              <input
                className="px-1 w-full"
                placeholder={"Charizard-Mega-X"}
                type="text"
                {...register("name")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5">
              <div className="font-bold mb-1">Display Name</div>
              <input
                className="px-1 w-full"
                placeholder={"Mega Charizard X"}
                type="text"
                {...register("displayName")}
              ></input>
            </div>
          </div>

          <div className="lg:flex lg:justify-center gap-10 mb-5">
            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Dex Nr.</div>
              <input
                className="px-1 w-full"
                placeholder={"6"}
                type="text"
                {...register("dexNr")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Generation</div>
              <input
                className="px-1 w-full"
                placeholder={"6"}
                type="text"
                {...register("generation")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5">
              <div className="font-bold mb-1">Sprite-Suffix</div>
              <input
                className="px-1 w-full"
                placeholder={"-mega-x"}
                type="text"
                {...register("spriteSuffix")}
              ></input>
            </div>
          </div>

          <div className="lg:flex lg:justify-center gap-10 mb-5">
            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Color</div>
              <input
                className="px-1 w-full"
                placeholder={"black"}
                type="text"
                {...register("color")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Nfe</div>
              <input
                className="px-1 w-full"
                placeholder={"false"}
                type="text"
                {...register("isNfe")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Uber</div>
              <input
                className="px-1 w-full"
                placeholder={"false"}
                type="text"
                {...register("isUber")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Form</div>
              <input
                className="px-1 w-full"
                placeholder={"true"}
                type="text"
                {...register("isForm")}
              ></input>
            </div>
          </div>

          <div className="lg:flex lg:justify-center gap-4 mb-5 lg:mb-5">
            <div
              className="bg-brand p-2 rounded-lg mb-5 lg:w-36"
              style={{ backgroundColor: typeColors[activeType1?.toLowerCase()] }}
            >
              <div className="font-bold mb-1">Type 1</div>
              {/* {!typeData && !typeError && (
                <div className="bg-gray-100">Loading types...</div>
              )}

              {typeError && <div className="text-center w-full">Error loading Types 😞</div>} */}

              {types && (
                <select
                  className="px-1 w-full"
                  {...register("type1")}
                  onChange={(e) => {
                    setActiveType1(e.target.value);
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

            <div
              className="bg-brand p-2 rounded-lg mb-5 lg:w-36"
              style={{ backgroundColor: typeColors[activeType2?.toLowerCase()] }}
            >
              <div className="font-bold mb-1">Type 2</div>
              {/* {!typeData && !typeError && (
                <div className="bg-gray-100">Loading types...</div>
              )}

              {typeError && <div className="text-center w-full">Error loading Types 😞</div>} */}

              {types && (
                <select
                  className="px-1 w-full"
                  {...register("type2")}
                  onChange={(e) => {
                    setActiveType2(e.target.value);
                  }}
                >
                  <option value="">-</option>
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

          <SaveButton text={"Add"} onSubmit={whileSubmit} disabled={whileSubmit} />
        </form>
      </div>
    </div>
  );
};
