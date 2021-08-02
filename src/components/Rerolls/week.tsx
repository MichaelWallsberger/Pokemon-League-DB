import { PokemonReroll } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { iTimeEventPokemonReroll } from "~/api";
import TypeColors from "~/styles/typeColors";
import { capitalizeFirstLetter, createImgUrl } from "../../utils/utilites";

export interface PokemonData {
  name: string;
  dexNr: number;
  spriteSuffix?: string;
}

interface WeekRerollProps {
  reroll: iTimeEventPokemonReroll;
}

export const WeekReroll: React.FC<WeekRerollProps> = ({ reroll }) => {
  const [imgUrlOldPokemon, setImgUrlOldPokemon] = useState<string>("");
  const [imgUrlNewPokemon, setImgUrlNewPokemon] = useState<string>("");
  const [imgOldLoaded, setImgOldLoaded] = useState<boolean>(false);
  const [imgNewLoaded, setImgNewLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgUrlOldPokemon(createImgUrl(reroll.prevP));
    setImgUrlNewPokemon(createImgUrl(reroll.newP));
  }, [reroll]);

  return (
    <div className="reroll-container">
      <p className="reroll-trainer">{reroll.trainerName}</p>
      <p
        className="trainer-pokemon-type reroll-type"
        style={{ backgroundColor: TypeColors[reroll.typeName.toLowerCase()] }}
      >
        {capitalizeFirstLetter(reroll.typeName)}
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
