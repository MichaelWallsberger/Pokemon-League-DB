import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/utils/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // get all todos
    const todos = await db.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(todos);
  } else if (req.method === "POST") {
    // create todo
    const text = JSON.parse(req.body).text;
    const todo = await db.todo.create({
      data: { text, completed: false },
    });

    res.json(todo);
  } else if (req.method === "PUT") {
    // update todo
    const id = req.query.todoId as string;
    const data = JSON.parse(req.body);
    const todo = await db.todo.update({
      where: { id },
      data,
    });

    res.json(todo);
  } else if (req.method === "DELETE") {
    // delete only one note
    if (req.body === "single") {
      // delete todo
      const id = req.query.todoId as string;
      await db.todo.delete({ where: { id } });
    }
    // Delete all
    else if (req.body === "all") {
      await db.todo.deleteMany({});
    }

    res.json({ status: "ok" });
  }
};
