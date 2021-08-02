import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const trainerId = req.query.trainerId as string;

    const reroll = await db.trainers.findFirst({
      where: { name: trainerId },
      include: {
        PokemonRerolls: {
          include: {
            prevP: true,
            newP: true,
            timeEvent: true,
          },
        },
      },
    });

    res.json(reroll);
  }
};
