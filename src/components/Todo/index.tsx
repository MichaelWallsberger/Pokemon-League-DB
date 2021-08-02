import React from "react";
import Head from "next/head";
import styles from "~/styles/Home.module.css";
import { AddTodo } from "~/components/Todo/AddTodo";
import { TodoList } from "~/components/Todo/TodoList";
import { Todo as ITodo } from "@prisma/client";

interface TodoProps {
  todo: ITodo;
}

export const Todo: React.FC<TodoProps> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Todos</h1>
        <h2 className={styles.desc}>
          NextJS app connected to Postgres using Prisma and hosted on{" "}
          <a href="https://railway.app">Railway</a>
        </h2>
      </header>

      <main className={styles.main}>
        <AddTodo />

        <TodoList />
      </main>
    </div>
  );
};
