import type { NextApiRequest, NextApiResponse } from "next";
import { TrainerWithTrainerPokemons } from "~/api";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // get all todos
    const trainers = await db.trainers.findMany({
      select: {
        name: true,
        imgUrl: true,
        discordName: true,
        teamNr: true,
        divisionName: true,
        TrainerPokemons: {
          select: {
            pokemon: true,
            typeName: true,
            kills: true,
          },
          orderBy: { typeName: "asc" },
        },
        division: true,
      },
      orderBy: { teamNr: "asc" },
    });

    res.json(trainers);
  }
  // create Trainer
  else if (req.method === "POST") {
    const data: TrainerWithTrainerPokemons = JSON.parse(req.body);

    // convert string into number
    data.TrainerPokemons.forEach((poke) => {
      poke.pokemonId = +poke.pokemonId;
      poke.kills = +poke.kills;
    });

    const t = await db.trainers.create({
      data: {
        name: data.name,
        discordName: data.discordName,
        teamNr: +data.teamNr,
        divisionName: data.divisionName,
        TrainerPokemons: {
          create: data.TrainerPokemons,
        },
      },
      include: {
        TrainerPokemons: true,
      },
    });

    res.json(t);
  }
  // update Trainer
  else if (req.method === "PUT") {
    const id = req.query.trainerName as string;
    const data: TrainerWithTrainerPokemons = JSON.parse(req.body);

    // convert string into number
    data.TrainerPokemons.forEach((poke) => {
      poke.pokemonId = +poke.pokemonId;
      poke.kills = +poke.kills;
    });

    const t = await db.trainers.update({
      where: { name: id },
      data: {
        name: data.name,
        discordName: data.discordName,
        teamNr: +data.teamNr,
        divisionName: data.divisionName,
        TrainerPokemons: {
          deleteMany: {},
          create: data.TrainerPokemons,
        },
      },
      include: {
        TrainerPokemons: true,
      },
    });

    res.json(t);
  }
  // delete Trainer
  else if (req.method === "DELETE") {
    const id: string = JSON.parse(req.body);

    const delTrainerPoke = db.trainerPokemons.deleteMany({
      where: { trainerName: id },
    });

    const delTrainer = db.trainers.delete({
      where: { name: id },
    });

    const transaction = await db.$transaction([delTrainerPoke, delTrainer]);

    res.json(transaction);
  }
};
