import { Division } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // get all todos
    const division = await db.division.findMany({
      select: {
        name: true,
        header: true,
        borderColor: true,
        backgroundColor: true,
        Trainers: true,
        index: true,
      },
      orderBy: { index: "asc" },
    });

    res.json(division);
  }
  // create division
  else if (req.method === "POST") {
    const data: Division = JSON.parse(req.body);

    const division = await db.division.create({
      data: {
        name: data.name,
        index: +data.index,
        header: data.header,
        backgroundColor: data.backgroundColor,
        borderColor: data.borderColor,
      },
    });

    res.json(division);
  }
  // update rule
  else if (req.method === "PUT") {
    const id = req.query.divisionId as string;

    const data: Division = JSON.parse(req.body);

    const division = await db.division.update({
      where: { name: id },
      data: {
        name: data.name,
        index: +data.index,
        header: data.header,
        backgroundColor: data.backgroundColor,
        borderColor: data.borderColor,
      },
    });
    res.json(division);
  }
  // delete only one note
  else if (req.method === "DELETE") {
    // delete todo
    const id = req.query.divisionId as string;

    await db.division.delete({
      where: {
        name: id,
      },
    });

    res.json({ status: "ok" });
  }
};
