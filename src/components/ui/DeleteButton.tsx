import React from "react";
import { Loader } from "./Loading";
import classNames from "classnames";

interface Props {
  text: string | JSX.Element;
  onSubmit: boolean;
  setShowModal: () => void;
  disabled?: boolean;
}

export const DeleteButton: React.FC<Props> = ({
  text,
  onSubmit,
  setShowModal,
  disabled = false,
}) => {
  return (
    <button
      onClick={() => setShowModal()}
      className={classNames(
        "flex bg-red-500 p-2 rounded-lg shadow-lg font-bold tracking-widest ",
        disabled ? "cursor-wait" : "hover:bg-red-400"
      )}
      disabled={disabled}
    >
      {onSubmit ? (
        <Loader backgroundColor={"red"} />
      ) : (
        <span className="material-icons mr-2">delete</span>
      )}
      {text}
    </button>
  );
};
