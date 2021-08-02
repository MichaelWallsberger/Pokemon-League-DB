import React from "react";
import { useTodos } from "~/api";
import styles from "~/styles/Home.module.css";
import { TodoItem } from "~/components/Todo/TodoItem";
import { Todo } from "@prisma/client";

interface TodoListProps {}

export const TodoList: React.FC<TodoListProps> = () => {
  const { data: todos, error } = useTodos();

  if (error != null) return <div>Error loading todos...</div>;
  if (todos == null) return <div>Loading...</div>;

  if (todos.length === 0) {
    return <div className={styles.emptyState}>Try adding a todo ☝️️</div>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.map((todo: Todo) => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
};
