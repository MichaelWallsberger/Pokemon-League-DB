import { Rule } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createRule } from "~/api";
import { BackButton } from "~/components/ui/BackButton";
import { Error } from "~/components/ui/Error";
import { SaveButton } from "~/components/ui/SaveButton";

interface AddRuleProps {
  setTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const AddRule: React.FC<AddRuleProps> = ({ setTab }) => {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [whileSubmit, setWhileSubmit] = useState<boolean>(false);

  const onSubmit = (e) => {
    setWhileSubmit(true);

    const addRule: Rule = { id: -1, index: -1, title: e.title, text: e.text };

    createRule(addRule).then((text: string) => {
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
          <div className="mb-5 bg-brand p-2 rounded-lg">
            <div className="font-bold mb-1">Title</div>
            <input
              className="px-1 w-full"
              placeholder="Fun Clause"
              defaultValue={""}
              {...register("title")}
            ></input>
          </div>

          <div className="bg-brand p-2 rounded-lg mb-10">
            <div className="font-bold mb-1">Text</div>
            <textarea
              className="w-full px-1"
              placeholder="Pledge Nr. 10: Let's all have fun and play together!"
              defaultValue={""}
              {...register("text")}
            ></textarea>
          </div>

          <SaveButton text={"Add"} onSubmit={whileSubmit} disabled={whileSubmit} />
        </form>
      </div>
    </div>
  );
};
