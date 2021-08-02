import React from "react";

interface AddButtonProps {
  text: string;
  setTab: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ text, setTab }) => {
  return (
    <div className="mb-7">
      <button
        className="flex bg-green-200 mx-auto p-2 rounded-lg shadow-lg hover:bg-green-300"
        onClick={() => {
          setTab();
        }}
      >
        <span className="material-icons mr-2">add_circle</span>
        {text}
      </button>
    </div>
  );
};
