import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get User
  if (req.method === "GET") {
    const name = req.query.name as string;
    const password = req.query.password as string;

    const user = await db.user.findFirst({
      where: {
        name: name,
        password: password,
      },
    });

    res.json(user);
  }
  // create User
  else if (req.method === "POST") {
    const data: any = JSON.parse(req.body);

    const rule = await db.user.create({
      data: {
        name: data.name,
        password: data.password,
      },
    });

    res.json(rule);
  }
};
