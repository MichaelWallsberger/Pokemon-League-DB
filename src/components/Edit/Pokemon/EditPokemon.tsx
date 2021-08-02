import { Type } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deletePokemon, iPokemon, PokemonWithTypes, updatePokemon } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { DeleteButton } from "~/components/ui/DeleteButton";
import { Error } from "~/components/ui/Error";
import { Modal } from "~/components/ui/Modal";
import { SaveButton } from "~/components/ui/SaveButton";
import { Success } from "~/components/ui/Success";
import typeColors from "~/styles/typeColors";
import { types } from "~/utils/utilites";

interface EditPokemonProps {
  pokemon: iPokemon;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const EditPokemon: React.FC<EditPokemonProps> = ({ pokemon, setTab }) => {
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeType1, setActiveType1] = useState<string>(pokemon?.types[0]?.type);
  const [activeType2, setActiveType2] = useState<string>(pokemon?.types[1]?.type);
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);
  const [whileDelete, setWhileDelete] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const p: PokemonWithTypes = {
      id: pokemon.id,
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
    // // update Pokemon
    updatePokemon(p).then((text: string) => {
      if (text != "success") {
        setErrorMessage(text);
        setShowError(true);
      }
      // success
      else {
        setShowSuccess(true);
      }

      setWhileSubmit(false);
    });
  };

  const delRule = () => {
    setWhileDelete(true);

    deletePokemon(pokemon.id).then((text: string) => {
      if (text != "success") {
        setErrorMessage(text);
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
        title={`Delete: ${pokemon.nameDisplay}`}
        text={"This will perment delete this Item."}
        showModal={showModal}
        setShowModal={setShowModal}
        onSucess={delRule}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex lg:justify-center gap-4 mb-5 lg:mb-5">
            <div className="bg-brand p-2 rounded-lg mb-5">
              <div className="font-bold mb-1">Name</div>
              <input
                className="px-1 w-full"
                placeholder={"Charizard-Mega-X"}
                defaultValue={pokemon.name}
                type="text"
                {...register("name")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5">
              <div className="font-bold mb-1">Display Name</div>
              <input
                className="px-1 w-full"
                placeholder={"Mega Charizard X"}
                defaultValue={pokemon.nameDisplay}
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
                defaultValue={pokemon.dexNr}
                type="text"
                {...register("dexNr")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Generation</div>
              <input
                className="px-1 w-full"
                placeholder={"6"}
                defaultValue={pokemon.generation}
                type="text"
                {...register("generation")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5">
              <div className="font-bold mb-1">Sprite-Suffix</div>
              <input
                className="px-1 w-full"
                placeholder={"-mega-x"}
                defaultValue={pokemon.spriteSuffix}
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
                defaultValue={pokemon.color}
                type="text"
                {...register("color")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Nfe</div>
              <input
                className="px-1 w-full"
                placeholder={"false"}
                defaultValue={pokemon.isNfe.toString()}
                type="text"
                {...register("isNfe")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Uber</div>
              <input
                className="px-1 w-full"
                placeholder={"false"}
                defaultValue={pokemon.isUber.toString()}
                type="text"
                {...register("isUber")}
              ></input>
            </div>

            <div className="bg-brand p-2 rounded-lg mb-5 lg:w-32">
              <div className="font-bold mb-1">Form</div>
              <input
                className="px-1 w-full"
                placeholder={"true"}
                defaultValue={pokemon.isForm.toString()}
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
                  defaultValue={pokemon?.types[0]?.type}
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
                  defaultValue={pokemon?.types[1]?.type}
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

          <SaveButton text={"Save"} onSubmit={whileSubmit} disabled={whileDelete || whileSubmit} />
        </form>
      </div>
    </div>
  );
};
