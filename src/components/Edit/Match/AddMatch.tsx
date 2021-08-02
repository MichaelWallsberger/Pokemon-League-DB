import { TimeEvent, TrainerMatch } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createTrainerMatch, iTrainer, useTimeEvent, useTrainer } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { Error } from "~/components/ui/Error";
import { SaveButton } from "~/components/ui/SaveButton";

interface AddMatchProps {
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const AddMatch: React.FC<AddMatchProps> = ({ setTab }) => {
  const { data: eventData, error: eventError } = useTimeEvent();
  const { data: trainerData, error: trainerError } = useTrainer();
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    // player plays against himself
    if (e.trainer1 === e.trainer2) {
      setErrorMessage("Trainer is playing against himself.");
      setShowError(true);
      return;
    }

    // winner is neither of the two players
    if (e.winner != "" && e.trainer1 != e.winner && e.trainer2 != e.winner) {
      setErrorMessage("The winner has to be one of the two players.");
      setShowError(true);
      return;
    }

    const addTrainerMatch: TrainerMatch = {
      id: -1,
      eventString: e.event,
      trainer1: e.trainer1,
      trainer2: e.trainer2,
      winnerName: e.winner,
    };

    createTrainerMatch(addTrainerMatch).then((text: string) => {
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
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Match Event</div>

              {!eventData && !eventError && <div className="bg-gray-100">Loading Events...</div>}

              {eventError && <div className="text-center w-full">Error loading Events 😞</div>}

              {eventData && (
                <select className="px-1 w-full" {...register("event")}>
                  {eventData.map((event: TimeEvent) => {
                    return (
                      <option key={event.event} value={event.event}>
                        {event.event}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>

          <div className="lg:flex lg:justify-around mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Trainer 1</div>
              {!trainerData && !trainerError && (
                <div className="bg-gray-100">Loading trainers...</div>
              )}

              {trainerError && <div className="text-center w-full">Error loading Trainers 😞</div>}

              {trainerData && (
                <select className="px-1 w-full" {...register("trainer1")}>
                  {trainerData.map((trainer: iTrainer) => {
                    return (
                      <option key={trainer.name} value={trainer.name}>
                        {trainer.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Trainer 2</div>
              {!trainerData && !trainerError && (
                <div className="bg-gray-100">Loading trainers...</div>
              )}

              {trainerError && <div className="text-center w-full">Error loading Trainers 😞</div>}

              {trainerData && (
                <select className="px-1 w-full" {...register("trainer2")}>
                  {trainerData.map((trainer: iTrainer) => {
                    return (
                      <option key={trainer.name} value={trainer.name}>
                        {trainer.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Winner</div>
              {!trainerData && !trainerError && (
                <div className="bg-gray-100">Loading trainers...</div>
              )}

              {trainerError && <div className="text-center w-full">Error loading Trainers 😞</div>}

              {trainerData && (
                <select className="px-1 w-full" {...register("winner")}>
                  <option value={""}>-</option>
                  {trainerData.map((trainer: iTrainer) => {
                    return (
                      <option key={trainer.name} value={trainer.name}>
                        {trainer.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>

          <SaveButton text={"Add"} onSubmit={whileSubmit} disabled={whileSubmit} />
        </form>
      </div>
    </div>
  );
};
