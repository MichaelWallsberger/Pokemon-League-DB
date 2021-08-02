import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "~/api";
import { Error } from "~/components/ui/Error";
import { Success } from "../ui/Success";

interface CreateUserProps {}

export const CreateUser: React.FC<CreateUserProps> = () => {
  const { register, handleSubmit } = useForm();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = (e) => {
    createUser(e.name, e.password).then((text: string) => {
      if (text != "success") {
        setErrorMessage(text);
        setShowError(true);
      } else {
        setShowSuccess(true);
      }
    });
  };

  return (
    <div className="mx-10">
      {showSuccess && (
        <Success
          text={"The ants successfully carried the operration across the glob."}
          setShowSuccess={setShowSuccess}
        />
      )}
      {showError && <Error text={errorMessage} setShowError={setShowError} />}

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-brand p-2 rounded-lg mb-5">
            <div className="font-bold mb-1">Name</div>
            <input
              className="px-1 w-full"
              placeholder={"Enter Name..."}
              {...register("name")}
            ></input>
          </div>

          <div className="mb-5 bg-brand p-2 rounded-lg">
            <div className="font-bold mb-1">Password</div>
            <input
              className="px-1 w-full"
              placeholder={"Enter Password..."}
              {...register("password")}
            ></input>
          </div>

          <button
            type="submit"
            className="flex bg-green-200 p-2 rounded-lg mx-auto font-bold tracking-widest shadow-lg hover:bg-green-300"
          >
            <span className="material-icons mr-2">save</span>Create
          </button>
        </form>
      </div>
    </div>
  );
};
