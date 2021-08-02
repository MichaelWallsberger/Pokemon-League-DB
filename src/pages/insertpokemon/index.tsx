import React from "react";
import { createPokemon, findP, PokemonWithTypes } from "~/api";
import PokemonData from "~/utils/Pokemons.json";

interface AddPokemonProps {}

const AddPokemon: React.FC<AddPokemonProps> = ({}) => {
  const addP = () => {
    PokemonData.forEach((p) => {
      findP(p.name)
        // found pokemon
        .then(async (res) => {
          let pokemon = await res.json();
        })
        // insert pokemon
        .catch((e) => {
          if (p.spriteSuffix == undefined) p.spriteSuffix = "";
          if (p.types[1] == undefined) p.types[1] = "";

          p.types[0] = p.types[0].charAt(0).toUpperCase() + p.types[0].slice(1);
          p.types[1] = p.types[1].charAt(0).toUpperCase() + p.types[1].slice(1);

          const newP: PokemonWithTypes = {
            id: -1,
            name: p.name,
            nameDisplay: p.name,
            dexNr: p.dexNr,
            generation: p.generation,
            color: p.color,
            isNfe: p.isNfe,
            isUber: p.isUber,
            isForm: p.isForm,
            type1: p.types[0],
            type2: p.types[1],
            spriteSuffix: p.spriteSuffix,
          };

          createPokemon(newP);
        });
    });
  };

  return (
    <div>
      <h1>Insert Pokemon</h1>

      <div className="text-center">
        <button onClick={() => addP()} className="bg-green-300 py-1 px-2 rounded">
          add
        </button>
      </div>
    </div>
  );
};

export default AddPokemon;
