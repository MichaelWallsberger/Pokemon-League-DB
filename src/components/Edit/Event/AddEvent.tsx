import { TimeEvent } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createTimeEvent } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { Error } from "~/components/ui/Error";
import { SaveButton } from "~/components/ui/SaveButton";
import { checkIndexValue } from "~/utils/utilites";

interface AddEventProps {
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface ErrorMessage {
  show: boolean;
  message: string;
}

export const AddEvent: React.FC<AddEventProps> = ({ setTab }) => {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [indexError, setIndexError] = useState<ErrorMessage>({ show: false, message: "" });
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const addEvent: TimeEvent = {
      event: e.event,
      index: e.index,
      header: e.header,
    };

    createTimeEvent(addEvent).then((text: string) => {
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
          <div className="lg:flex lg:justify-center gap-10 mb-5 lg:mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Event</div>
              <input
                className="px-1 w-full"
                placeholder="Week 1"
                defaultValue={""}
                {...register("event")}
              ></input>
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Header</div>
              <input
                className="px-1 w-full"
                placeholder="Week 1: May 3-10"
                defaultValue={""}
                {...register("header")}
              ></input>
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Index</div>
              <input
                className="px-1 w-full"
                placeholder="1"
                defaultValue={""}
                {...register("index")}
                onChange={(e) => checkIndexValue(e.target.value, setIndexError)}
              ></input>
              {indexError.show && <p className="text-red-500 text-center">{indexError.message}</p>}
            </div>
          </div>

          <SaveButton text={"Add"} onSubmit={whileSubmit} disabled={whileSubmit} />
        </form>
      </div>
    </div>
  );
};
