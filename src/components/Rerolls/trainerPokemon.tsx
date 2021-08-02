import { Pokemon } from "@prisma/client";
import React, { useEffect, useState } from "react";
import TypeColors from "~/styles/typeColors";
import { capitalizeFirstLetter, createImgUrl } from "../../utils/utilites";

interface TrainerPokemonProps {
  timeEventName: string;
  type: string;
  prevPokemon: Pokemon;
  newPokemon: Pokemon;
}

export const TrainerPokemon: React.FC<TrainerPokemonProps> = ({
  timeEventName,
  type,
  prevPokemon,
  newPokemon,
}) => {
  const [imgOldLoaded, setImgOldLoaded] = useState<boolean>(false);
  const [imgNewLoaded, setImgNewLoaded] = useState<boolean>(false);

  const imgUrlOldPokemon: string = createImgUrl(prevPokemon);
  const imgUrlNewPokemon: string = createImgUrl(newPokemon);

  return (
    <div className="reroll-container">
      <p className="text-xl">{`${timeEventName}:`}</p>
      <p
        className="trainer-pokemon-type reroll-type"
        style={{ backgroundColor: TypeColors[type.toLowerCase()] }}
      >
        {capitalizeFirstLetter(type)}
      </p>

      <img
        className="trainer-pokemon-img"
        style={imgOldLoaded ? {} : { visibility: "hidden" }}
        onLoad={() => setImgOldLoaded(true)}
        src={imgUrlOldPokemon}
        alt="img"
      />
      <p className="reroll-arrow">&#8594;</p>
      <img
        className="trainer-pokemon-img"
        style={imgNewLoaded ? {} : { visibility: "hidden" }}
        onLoad={() => setImgNewLoaded(true)}
        src={imgUrlNewPokemon}
        alt="img"
      />
    </div>
  );
};
