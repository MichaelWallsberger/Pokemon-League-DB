import { Division, TrainerMatch } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const event = req.query.event as string;
    // get all todos
    if (!event) {
      const trainerMatches = await db.trainerMatch.findMany({
        orderBy: { id: "asc" },
      });

      res.json(trainerMatches);
    }
    // get from specific event
    else {
      const trainerMatches = await db.trainerMatch.findMany({
        where: { eventString: event },
        orderBy: { id: "asc" },
      });

      res.json(trainerMatches);
    }
  }
  // create division
  else if (req.method === "POST") {
    const data: TrainerMatch = JSON.parse(req.body);
    const winner: string | null = data.winnerName != "" ? data.winnerName : null;

    const trainerMatch = async () => {
      if (winner)
        await db.trainerMatch.create({
          data: {
            eventString: data.eventString,
            trainer1: data.trainer1,
            trainer2: data.trainer2,
            winnerName: data.winnerName,
          },
        });
      else
        await db.trainerMatch.create({
          data: {
            eventString: data.eventString,
            trainer1: data.trainer1,
            trainer2: data.trainer2,
          },
        });
    };

    res.json(trainerMatch());
  }
  // update Trainer-Match
  else if (req.method === "PUT") {
    const data: TrainerMatch = JSON.parse(req.body);

    if (data.winnerName === "") data.winnerName = null;

    const tmatch = await db.trainerMatch.update({
      where: { id: data.id },
      data: {
        trainer1: data.trainer1,
        trainer2: data.trainer2,
        winnerName: data.winnerName,
      },
    });

    res.json(tmatch);
  }
  // delete Trainer-Match
  else if (req.method === "DELETE") {
    const id = +req.query.trainerMatchId as number;

    await db.trainerMatch.delete({
      where: {
        id: id,
      },
    });

    res.json({ status: "ok" });
  }
};
