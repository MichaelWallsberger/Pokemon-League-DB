import { Pokemon } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get all rules
  if (req.method === "GET") {
    const pname = req.query.name as string;

    const foundP: Pokemon = await db.pokemon.findFirst({
      where: { name: pname },
    });

    res.json(foundP);
  }
};
