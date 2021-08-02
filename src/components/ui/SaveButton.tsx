import classNames from "classnames";
import React from "react";
import { Loader } from "./Loading";

interface LoadButtonProps {
  text: string | JSX.Element;
  onSubmit: boolean;
  disabled?: boolean;
}

export const SaveButton: React.FC<LoadButtonProps> = ({ text, onSubmit, disabled = false }) => {
  return (
    <button
      type="submit"
      className={classNames(
        "flex bg-green-200 p-2 rounded-lg mx-auto font-bold tracking-widest shadow-lg",
        disabled ? "cursor-wait" : "hover:bg-green-300"
      )}
      disabled={disabled}
    >
      {onSubmit ? (
        <Loader backgroundColor={"green"} />
      ) : (
        <span className="material-icons mr-2">save</span>
      )}
      {text}
    </button>
  );
};
