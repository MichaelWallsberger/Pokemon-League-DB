import { Division } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createDivsison } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { Error } from "~/components/ui/Error";
import { SaveButton } from "~/components/ui/SaveButton";
import { checkIndexValue } from "~/utils/utilites";

interface AddDivisionProps {
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface ErrorMessage {
  show: boolean;
  message: string;
}

export const AddDivision: React.FC<AddDivisionProps> = ({ setTab }) => {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [indexError, setIndexError] = useState<ErrorMessage>({ show: false, message: "" });
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const addDivision: Division = {
      index: e.index,
      name: e.name,
      header: e.header,
      backgroundColor: e.bgColor,
      borderColor: e.borderColor,
    };

    createDivsison(addDivision).then((text: string) => {
      if (text != "success") {
        setErrorMessage(text);
        setShowError(true);
      } else {
        setTab("");
      }

      setWhileSubmit(false);
    });
  };

  return (
    <div className="mx-10">
      {showError && <Error text={errorMessage} setShowError={setShowError} />}

      <div className="flex justify-between">
        <BackButton setTab={() => setTab("")} />
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex lg:justify-center mb-5 lg:mb-10">
            <div className="bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Name</div>
              <input
                className="px-1 w-full"
                placeholder={"pool-1"}
                type="text"
                {...register("name")}
              ></input>
            </div>
          </div>

          <div className="lg:flex lg:justify-around mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg lg:w-1/12">
              <div className="font-bold mb-1">Index</div>
              <input
                className="px-1 w-full"
                {...register("index")}
                placeholder={"1"}
                onChange={(e) => checkIndexValue(e.target.value, setIndexError)}
              ></input>
              {indexError.show && <p className="text-red-500 text-center">{indexError.message}</p>}
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Header</div>
              <input
                className="px-1 w-full"
                placeholder={"Doom Division"}
                {...register("header")}
              ></input>
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Background-Color</div>
              <input
                className="px-1 w-full"
                placeholder={"rgba(255, 0, 0, 0.5)"}
                {...register("bgColor")}
              ></input>
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Border-Color</div>
              <input
                className="px-1 w-full"
                placeholder={"#ff0000"}
                {...register("borderColor")}
              ></input>
            </div>
          </div>

          <SaveButton text={"Add"} onSubmit={whileSubmit} disabled={whileSubmit} />
        </form>
      </div>
    </div>
  );
};
