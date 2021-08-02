import { Rule } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteRule, updateRule } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { DeleteButton } from "~/components/ui/DeleteButton";
import { Error } from "~/components/ui/Error";
import { Modal } from "~/components/ui/Modal";
import { SaveButton } from "~/components/ui/SaveButton";
import { Success } from "~/components/ui/Success";
import { checkIndexValue } from "~/utils/utilites";

interface EditRulesProps {
  rule: Rule;
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

interface ErrorMessage {
  show: boolean;
  message: string;
}

export const EditRule: React.FC<EditRulesProps> = ({ rule, setTab }) => {
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

    const updatedRule: Rule = { id: rule.id, index: e.index, title: e.title, text: e.text };

    // No index was in the input field
    if (!e.index) {
      setErrorMessage("No index Number is provided");
      setShowError(true);
      return;
    }

    // update Rule
    updateRule(updatedRule).then((e) => {
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

    deleteRule(rule.id).then((text: string) => {
      if (text != "success") {
        setErrorMessage(text);
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
        <BackButton setTab={() => setTab("")} />

        <DeleteButton
          text={"Delete"}
          onSubmit={whileDelete}
          setShowModal={() => setShowModal(true)}
          disabled={whileDelete || whileSubmit}
        />
      </div>

      <Modal
        title={`Delete: ${rule.title}`}
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
          <div className="lg:flex lg:justify-around">
            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Index</div>
              <input
                className="px-1 w-full"
                defaultValue={rule.index}
                {...register("index")}
                onChange={(e) => checkIndexValue(e.target.value, setIndexError)}
              ></input>
              {indexError.show && <p className="text-red-500 text-center">{indexError.message}</p>}
            </div>

            <div className="mb-5 bg-brand p-2 rounded-lg">
              <div className="font-bold mb-1">Title</div>
              <input
                size={25}
                className="px-1 w-full"
                defaultValue={rule.title}
                {...register("title")}
              ></input>
            </div>
          </div>

          <div className="bg-brand p-2 rounded-lg mb-10">
            <div className="font-bold mb-1">Text</div>
            <textarea
              rows={rule.text.length > 450 ? 8 : 4}
              className="w-full px-1"
              defaultValue={rule.text}
              {...register("text")}
            ></textarea>
          </div>

          <SaveButton text={"Save"} onSubmit={whileSubmit} disabled={whileDelete || whileSubmit} />
        </form>
      </div>
    </div>
  );
};
