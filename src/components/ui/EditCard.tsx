import React from "react";

interface EditCardProps {
  keyCard: string | number;
  onClick: () => void;
  header: string | JSX.Element;
  subtext?: string | JSX.Element;
}

export const EditCard: React.FC<EditCardProps> = ({ keyCard, onClick, header, subtext }) => {
  return (
    <div
      key={keyCard}
      className="mb-1 bg-gray-200 p-2 transform hover:bg-brand cursor-pointer rounded-lg shadow-lg"
      style={{ width: "20rem" }}
      onClick={() => {
        onClick();
      }}
    >
      <div className="font-bold mb-1">{header}</div>
      <div className="text-gray-500 p-2">{subtext}</div>
    </div>
  );
};
