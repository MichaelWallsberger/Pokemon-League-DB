import React, { useState } from "react";
import { createTodo } from "~/api";
import styles from "~/styles/Home.module.css";

interface AddTodoProps {}

export const AddTodo: React.FC<AddTodoProps> = () => {
  const [text, setText] = useState<string>("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        createTodo(text);
        setText("");
      }}
      className={styles.addTodo}
    >
      <input
        className={styles.input}
        placeholder="Buy some milk"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.addButton}>Add</button>
    </form>
  );
};
