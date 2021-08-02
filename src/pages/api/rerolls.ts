import { PokemonReroll } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const rerolls = await db.timeEvent.findMany({
      include: {
        PokemonRerolls: {
          include: {
            prevP: true,
            newP: true,
          },
        },
      },
      orderBy: { index: "asc" },
    });

    res.json(rerolls);
  }
  // create Reroll
  else if (req.method === "POST") {
    const data: PokemonReroll = JSON.parse(req.body);

    const reroll = await db.pokemonReroll.create({
      data: {
        timeEventname: data.timeEventname,
        trainerName: data.trainerName,
        typeName: data.typeName,
        prevPokemon: +data.prevPokemon,
        newPokemon: +data.newPokemon,
      },
    });

    res.json(reroll);
  }
  // update Pokemon-Reroll
  else if (req.method === "PUT") {
    const data: PokemonReroll = JSON.parse(req.body);

    const tmatch = await db.pokemonReroll.update({
      where: { id: +data.id },
      data: {
        trainerName: data.trainerName,
        typeName: data.typeName,
        timeEventname: data.timeEventname,
        prevPokemon: +data.prevPokemon,
        newPokemon: +data.newPokemon,
      },
    });

    res.json(tmatch);
  }
  // delete Reroll
  else if (req.method === "DELETE") {
    const id = +req.query.rerollId as number;

    await db.pokemonReroll.delete({
      where: {
        id: id,
      },
    });

    res.json({ status: "ok" });
  }
};
