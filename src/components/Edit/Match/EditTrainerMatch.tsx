import { TrainerMatch } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteTrainerMatch, iTrainer, updateTrainerMatch, useTrainer } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { DeleteButton } from "~/components/ui/DeleteButton";
import { Error } from "~/components/ui/Error";
import { Modal } from "~/components/ui/Modal";
import { SaveButton } from "~/components/ui/SaveButton";
import { Success } from "~/components/ui/Success";

interface EditTrainerMatchProps {
  trainerMatch: TrainerMatch;
  setTab?: React.Dispatch<React.SetStateAction<TrainerMatch>>;
}

export const EditTrainerMatch: React.FC<EditTrainerMatchProps> = ({ trainerMatch, setTab }) => {
  const { register, handleSubmit } = useForm();
  const { data: trainerData, error: trainerError } = useTrainer();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);
  const [whileDelete, setWhileDelete] = useState<boolean>(false);

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

    const tMatch: TrainerMatch = {
      id: trainerMatch.id,
      eventString: trainerMatch.eventString,
      trainer1: e.trainer1,
      trainer2: e.trainer2,
      winnerName: e.winner,
    };

    // // update TrainerMatch
    updateTrainerMatch(tMatch, trainerMatch.eventString).then((e) => {
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

    deleteTrainerMatch(trainerMatch.id, trainerMatch.eventString).then((e) => {
      // error occured
      if (e != "success") {
        setErrorMessage(e);
        setShowError(true);
      }
      // success
      else {
        setTab(null);
      }

      setWhileDelete(false);
    });
  };

  return (
    <div className="mx-10">
      <div className="flex justify-between">
        <BackButton setTab={() => setTab(null)} />

        <DeleteButton
          text={"Delete"}
          onSubmit={whileDelete}
          setShowModal={() => setShowModal(true)}
          disabled={whileDelete || whileSubmit}
        />
      </div>

      <Modal
        title={`Delete: ${trainerMatch.trainer1} vs ${trainerMatch.trainer2}`}
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
          <div className="lg:flex lg:flex-1 lg:justify-around mb-10">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Trainer1</div>

              {!trainerData && !trainerError && (
                <div className="bg-gray-100">Loading trainers...</div>
              )}

              {trainerError && <div className="text-center w-full">Error loading Trainers 😞</div>}

              {trainerData && (
                <select
                  className="px-1 w-full"
                  defaultValue={trainerMatch.trainer1}
                  {...register("trainer1")}
                >
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
                <select
                  className="px-1 w-full"
                  defaultValue={trainerMatch.trainer2}
                  {...register("trainer2")}
                >
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
                <select
                  className="px-1 w-full"
                  defaultValue={trainerMatch.winnerName}
                  {...register("winner")}
                >
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

          <SaveButton text={"Save"} onSubmit={whileSubmit} disabled={whileDelete || whileSubmit} />
        </form>
      </div>
    </div>
  );
};
