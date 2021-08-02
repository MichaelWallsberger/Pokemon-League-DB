import { Pokemon } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface PokemonSriteProps {
  pokemon: Pokemon;
}

export const PokemonSrite: React.FC<PokemonSriteProps> = ({ pokemon }) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    // set Sprite Url
    const suffix = pokemon.spriteSuffix === null ? "" : pokemon.spriteSuffix;
    setImgUrl("sprites/normal/" + pokemon.dexNr + suffix + ".png");
  }, [pokemon]);

  return (
    <img
      className="trainer-pokemon-img"
      style={imgLoaded ? { width: "40px", height: "40px" } : { visibility: "hidden" }}
      src={imgUrl}
      onLoad={() => setImgLoaded(true)}
      alt="img"
    />
  );
};
