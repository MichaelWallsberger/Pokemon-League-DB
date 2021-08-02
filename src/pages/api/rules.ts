import { Rule } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get all rules
  if (req.method === "GET") {
    const rules = await db.rule.findMany({
      orderBy: { index: "asc" },
    });

    res.json(rules);
  }
  // create rule
  else if (req.method === "POST") {
    const data: Rule = JSON.parse(req.body);

    const rule = await db.rule.create({
      data: {
        title: data.title,
        text: data.text,
      },
    });

    res.json(rule);
  }
  // update rule
  else if (req.method === "PUT") {
    const data: Rule = JSON.parse(req.body);

    const rule = await db.rule.update({
      where: { id: data.id },
      data: {
        index: +data.index,
        title: data.title,
        text: data.text,
      },
    });

    res.json(rule);
  }
  // delete Rule
  else if (req.method === "DELETE") {
    const id = +req.query.ruleId as number;

    await db.rule.delete({
      where: {
        id: id,
      },
    });

    res.json({ status: "ok" });
  }
};
