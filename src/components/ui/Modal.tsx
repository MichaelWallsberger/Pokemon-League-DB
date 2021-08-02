import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";

interface ModalProps {
  title: string;
  text: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSucess?: () => void;
  color: "red" | "green" | "blue";
}

export const Modal: React.FC<ModalProps> = ({
  title,
  text,
  showModal,
  setShowModal,
  onSucess,
  color,
}) => {
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-opacity-80 bg-gray-600"
          onClose={() => setShowModal(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{text}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className={classNames(
                      "inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      {
                        "text-blue-900 bg-blue-100 hover:bg-blue-300 focus-visible:ring-blue-500":
                          color === "blue",
                      },
                      {
                        "text-red-900 bg-red-100 hover:bg-red-300 focus-visible:ring-red-500":
                          color === "red",
                      },
                      {
                        "text-green-900 bg-green-100 hover:bg-green-300 focus-visible:ring-green-500":
                          color === "green",
                      }
                    )}
                    onClick={() => {
                      onSucess();
                      setShowModal(false);
                    }}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
