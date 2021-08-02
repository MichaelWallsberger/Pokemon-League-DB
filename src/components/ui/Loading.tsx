import classNames from "classnames";
import React from "react";

// ... Loading
interface LoadingProps {
  translateY?: string;
}
export const Loading: React.FC<LoadingProps> = ({ translateY }) => {
  return (
    <div
      className="pokemon-cards-loader"
      style={{ transform: translateY != null ? `translateY(${translateY})` : "" }}
    ></div>
  );
};

// circle loading
interface LoaderProps {
  translateY?: string;
  backgroundColor: "green" | "red";
}
export const Loader: React.FC<LoaderProps> = ({ translateY, backgroundColor }) => {
  return (
    <div
      className={classNames(
        "loader",
        backgroundColor === "green" && "loader-green",
        backgroundColor === "red" && "loader-red"
      )}
      style={{
        transform: translateY != null ? `translateY(${translateY})` : "",
      }}
    ></div>
  );
};
