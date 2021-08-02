import { Todo } from "@prisma/client";
import React from "react";
import { deleteTodo, toggleTodo } from "~/api";
import styles from "~/styles/Home.module.css";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <li className={styles.todo}>
      <label className={`${styles.label} ${todo.completed ? styles.checked : ""}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          className={`${styles.checkbox}`}
          onChange={() => toggleTodo(todo)}
        />
        {todo.text}
      </label>

      <button className={styles.deleteButton} onClick={() => deleteTodo(todo.id)}>
        ✕
      </button>
    </li>
  );
};
