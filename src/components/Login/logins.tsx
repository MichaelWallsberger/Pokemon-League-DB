import React, { useState } from "react";
import Head from "next/head";
import { User } from "@prisma/client";
import { getUser } from "~/api";
import { useForm } from "react-hook-form";
import { Error } from "../ui/Error";

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const Login: React.FC<LoginProps> = ({ setUser }) => {
  const { register, handleSubmit } = useForm();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = (e) => {
    getUser(e.name, e.password).then((e) => {
      // error occured
      if (e === "error") {
        setErrorMessage("Name or Password is wrong.");
        setShowError(true);
      }
      // success
      else {
        setUser(e);
      }
    });
  };

  return (
    <div className="">
      <Head>
        <title>Login</title>
      </Head>

      <header className="">
        <h1 className="">Login</h1>
      </header>

      <main className="flex justify-center text-center">
        {showError && <Error text={errorMessage} setShowError={setShowError} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-brand p-2 rounded-lg mb-5">
            <div className="font-bold mb-1">Name</div>
            <input
              className="px-1 w-full"
              placeholder={"Enter Name..."}
              type={"password"}
              autoComplete={"off"}
              required
              {...register("name")}
            ></input>
          </div>

          <div className="mb-5 bg-brand p-2 rounded-lg">
            <div className="font-bold mb-1">Password</div>
            <input
              className="px-1 w-full"
              placeholder={"Enter Password..."}
              type={"password"}
              autoComplete={"off"}
              required
              {...register("password")}
            ></input>
          </div>

          <button
            type="submit"
            className="flex bg-green-200 py-2 px-7 rounded-lg mx-auto font-bold tracking-widest shadow-lg hover:bg-green-300"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};
