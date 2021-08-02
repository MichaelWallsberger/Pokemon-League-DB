import React from "react";

interface Props {
  text?: string;
  setTab: () => void;
}

export const BackButton: React.FC<Props> = ({ text = "Back", setTab }) => {
  return (
    <button
      onClick={() => setTab()}
      className="flex bg-gray-400 p-2 rounded-lg shadow-lg font-bold tracking-widest hover:bg-gray-300"
    >
      <span className="material-icons mr-2">undo</span> {text}
    </button>
  );
};
