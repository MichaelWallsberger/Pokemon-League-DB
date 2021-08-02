import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const week = req.query.week as string;

  if (req.method === "GET") {
    const rerolls = await db.pokemonReroll.findMany({
      where: { timeEventname: week },
      include: {
        newP: true,
        prevP: true,
        timeEvent: true,
      },
      orderBy: { id: "asc" },
    });

    res.json(rerolls);
  }
};
