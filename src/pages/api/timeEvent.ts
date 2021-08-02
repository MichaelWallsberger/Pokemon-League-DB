import { TimeEvent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const eventtimes = await db.timeEvent.findMany({
      orderBy: { index: "asc" },
    });

    res.json(eventtimes);
  }
  // create Event
  else if (req.method === "POST") {
    const data: TimeEvent = JSON.parse(req.body);

    const event = await db.timeEvent.create({
      data: {
        event: data.event,
        index: +data.index,
        header: data.header,
      },
    });

    res.json(event);
  }
  // update Event
  else if (req.method === "PUT") {
    const id = req.query.eventId as string;
    const data: TimeEvent = JSON.parse(req.body);

    const division = await db.timeEvent.update({
      where: { event: id },
      data: {
        event: data.event,
        index: +data.index,
        header: data.header,
      },
    });

    res.json(division);
  }
  // delete Event
  else if (req.method === "DELETE") {
    const id = req.query.eventId as string;

    await db.timeEvent.delete({
      where: {
        event: id,
      },
    });

    res.json({ status: "ok" });
  }
};
