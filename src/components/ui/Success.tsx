import classNames from "classnames";
import React, { useEffect, useState } from "react";

interface SuccessProps {
  text: string;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Success: React.FC<SuccessProps> = ({ text, setShowSuccess }) => {
  const [remove, setRemove] = useState<boolean>(false);

  useEffect(() => {
    // add css for removing component
    setTimeout(() => {
      setRemove(true);
    }, 3000);

    // remove component after effect
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  }, []);

  return (
    <div
      className={classNames(
        "fixed bottom-5 right-10 z-10 bg-green-200 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md modal-blend-in",
        remove && "modal-blend-out"
      )}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-green-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">Succesfull Update</p>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};
