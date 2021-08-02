import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const order = req.query.orderby as string;

    if (order === "name") {
      const pokemons = await db.pokemon.findMany({
        include: {
          types: true,
        },
        orderBy: { name: "asc" },
      });

      res.json(pokemons);
    } else {
      const pokemons = await db.pokemon.findMany({
        include: {
          types: true,
        },
        orderBy: { dexNr: "asc" },
      });

      res.json(pokemons);
    }
  }
  // create pokemon
  else if (req.method === "POST") {
    const data: any = JSON.parse(req.body);

    if (data.type2 != "" && data.type2 != undefined && data.type2 != null) {
      const pokemon = await db.pokemon.create({
        data: {
          name: data.name,
          nameDisplay: data.nameDisplay,
          dexNr: +data.dexNr,
          generation: +data.generation,
          spriteSuffix: data.spriteSuffix,
          color: data.color,
          isNfe: data.isNfe === "true",
          isUber: data.isUber === "true",
          isForm: data.isForm === "true",
          types: {
            create: [{ type: data.type1 }, { type: data.type2 }],
          },
        },
        include: {
          types: true,
        },
      });

      res.json(pokemon);
    }
    // insert only one type
    else {
      const pokemon = await db.pokemon.create({
        data: {
          name: data.name,
          nameDisplay: data.nameDisplay,
          dexNr: +data.dexNr,
          generation: +data.generation,
          spriteSuffix: data.spriteSuffix,
          color: data.color,
          isNfe: data.isNfe === "true",
          isUber: data.isUber === "true",
          isForm: data.isForm === "true",
          types: {
            create: { type: data.type1 },
          },
        },
        include: {
          types: true,
        },
      });

      res.json(pokemon);
    }
  }
  //  update pokemon
  else if (req.method === "PUT") {
    const data: any = JSON.parse(req.body);

    if (data.type2 != "") {
      const updatepoke = await db.pokemon.update({
        where: { id: data.id },
        data: {
          name: data.name,
          nameDisplay: data.nameDisplay,
          dexNr: +data.dexNr,
          generation: +data.generation,
          spriteSuffix: data.spriteSuffix,
          color: data.color,
          isNfe: data.isNfe === "true",
          isUber: data.isUber === "true",
          isForm: data.isForm === "true",
          types: {
            deleteMany: {},
            create: [{ type: data.type1 }, { type: data.type2 }],
          },
        },
        include: {
          types: true,
        },
      });

      res.json(updatepoke);
    }
    // insert only one type
    else {
      const updatepoke = await db.pokemon.update({
        where: { id: +data.id },
        data: {
          name: data.name,
          nameDisplay: data.nameDisplay,
          dexNr: +data.dexNr,
          generation: +data.generation,
          spriteSuffix: data.spriteSuffix,
          color: data.color,
          isNfe: data.isNfe === "true",
          isUber: data.isUber === "true",
          isForm: data.isForm === "true",
          types: {
            deleteMany: {},
            create: { type: data.type1 },
          },
        },
        include: {
          types: true,
        },
      });

      res.json(updatepoke);
    }
  }
  // delete pokemon
  else if (req.method === "DELETE") {
    const id: number = JSON.parse(req.body);

    const delType = db.pokemonTypes.deleteMany({
      where: { pokemon: +id },
    });

    const delPokemon = db.pokemon.delete({
      where: {
        id: +id,
      },
    });

    const transaction = await db.$transaction([delType, delPokemon]);

    res.json(transaction);
  }
};
