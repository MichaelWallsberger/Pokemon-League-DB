import { Type } from "@prisma/client";
import { PokemonData } from "../components/Rerolls/week";

// capitalize the first letter
export const capitalizeFirstLetter = (name: string) => {
  return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};

// create the path to the pokemon-image
export const createImgUrl = (pokeData: PokemonData) => {
  const suffix = pokeData.spriteSuffix == null ? "" : pokeData.spriteSuffix;
  return "sprites/normal/" + pokeData.dexNr + suffix + ".png";
};

export const types: Type[] = [
  { name: "Bug" },
  { name: "Dark" },
  { name: "Dragon" },
  { name: "Electric" },
  { name: "Fairy" },
  { name: "Fighting" },
  { name: "Fire" },
  { name: "Flying" },
  { name: "Ghost" },
  { name: "Grass" },
  { name: "Ground" },
  { name: "Ice" },
  { name: "Normal" },
  { name: "Poison" },
  { name: "Psychic" },
  { name: "Rock" },
  { name: "Steel" },
  { name: "Water" },
];

interface ErrorMessage {
  show: boolean;
  message: string;
}

export const checkIndexValue = (
  text: string,
  setIndexError: React.Dispatch<React.SetStateAction<ErrorMessage>>
) => {
  const timeout = setTimeout(() => {
    // no input
    if (!text || text.length === 0 || text === "")
      setIndexError({ show: true, message: "Enter a number!" });
    // error occured
    else if (!text.match(/^[0-9]*$/))
      setIndexError({ show: true, message: "Only numbers are allowed!" });
    // input contains only numbers
    else setIndexError({ show: false, message: "" });
  }, 250);

  return () => {
    clearTimeout(timeout);
  };
};
