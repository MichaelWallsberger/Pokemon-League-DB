import { TimeEvent } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteTimeEvent, updateTimeEvent } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { DeleteButton } from "~/components/ui/DeleteButton";
import { Error } from "~/components/ui/Error";
import { Modal } from "~/components/ui/Modal";
import { SaveButton } from "~/components/ui/SaveButton";
import { Success } from "~/components/ui/Success";
import { checkIndexValue } from "~/utils/utilites";

interface EditEventProps {
  event: TimeEvent;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface ErrorMessage {
  show: boolean;
  message: string;
}

export const EditEvent: React.FC<EditEventProps> = ({ event, setTab }) => {
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [indexError, setIndexError] = useState<ErrorMessage>({ show: false, message: "" });
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);
  const [whileDelete, setWhileDelete] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);
    // No index was in the input field
    if (!e.index) {
      setErrorMessage("No index Number is provided");
      setShowError(true);
      return;
    }

    const uEvent: TimeEvent = { event: e.event, index: e.index, header: e.header };

    // // update Event
    updateTimeEvent(uEvent, event.event).then((e) => {
      // error occured
      if (e != "success") {
        setErrorMessage(e);
        setShowError(true);
      }
      // success
      else {
        setShowSuccess(true);
      }

      setWhileSubmit(false);
    });
  };

  const delRule = () => {
    setWhileDelete(true);

    deleteTimeEvent(event.event).then((e) => {
      // error occured
      if (e != "success") {
        setErrorMessage(e);
        setShowError(true);
      }
      // success
      else {
        setTab("");
      }

      setWhileDelete(false);
    });
  };

  return (
    <div className="mx-10">
      <div className="flex justify-between">
        <BackButton setTab={() => setTab("")} />

        <DeleteButton
          text={"Delete"}
          onSubmit={whileDelete}
          setShowModal={() => setShowModal(true)}
          disabled={whileDelete || whileSubmit}
        />
      </div>

      <Modal
        title={`Delete: ${event.event}`}
        text={"This will perment delete this Item."}
        showModal={showModal}
        setShowModal={setShowModal}
        onSucess={delRule}
        color={"red"}
      />

      {showSuccess && (
        <Success
          text={"The ants successfully carried the operration across the glob."}
          setShowSuccess={setShowSuccess}
        />
      )}

      {showError && <Error text={errorMessage} setShowError={setShowError} />}

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex lg:justify-center gap-10 mb-5 lg:mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Event</div>
              <input
                className="px-1 w-full"
                placeholder="Week 1"
                defaultValue={event.event}
                {...register("event")}
              ></input>
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Header</div>
              <input
                className="px-1 w-full"
                placeholder="Week 1: May 3-10"
                defaultValue={event.header}
                {...register("header")}
              ></input>
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Index</div>
              <input
                className="px-1 w-full"
                placeholder="1"
                defaultValue={event.index}
                {...register("index")}
                onChange={(e) => checkIndexValue(e.target.value, setIndexError)}
              ></input>
              {indexError.show && <p className="text-red-500 text-center">{indexError.message}</p>}
            </div>
          </div>

          <SaveButton text={"Save"} onSubmit={whileSubmit} disabled={whileDelete || whileSubmit} />
        </form>
      </div>
    </div>
  );
};
