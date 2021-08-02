import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const event = await db.timeEvent.findMany({
      include: {
        TrainerMatch: true,
      },
      orderBy: { index: "asc" },
    });

    res.json(event);
  }
};
