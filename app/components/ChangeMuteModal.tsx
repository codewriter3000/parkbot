import type { FunctionComponent } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Form } from "@remix-run/react";
import TimeUnitDropdown from "./TimeUnitDropdown";

type ChangeMuteModalProps = {
  openHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectedMembers: any[];
};

export const ChangeMuteModal: FunctionComponent<ChangeMuteModalProps> = ({
  openHook,
  selectedMembers,
}: ChangeMuteModalProps) => {
  const cancelButtonRef = useRef(null);

  const emptyMute = {
    length: 0,
    timeUnit: "minutes",
    reason: "",
  };

  const [mute, setMute] = useState(emptyMute);

  const handleInputChange = (event: any) => {
    const target = event.target;
  };

  const prefill = getPrefill(selectedMembers);

  return (
    <Transition.Root show={openHook[0]} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={openHook[1]}
      >
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg
               text-left
            overflow-hidden shadow-xl
            transform transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              {/* TODO This should be moved into the right fiels in the dialog */}
              <Form action="#" method="post" id="hacky-backend-form">
                <input type="hidden" name="action" value="mute" />
                {selectedMembers.map((member) => (
                  <input
                    type="hidden"
                    name="users"
                    value={member.id}
                    key={member.id}
                  />
                ))}
                <input
                  type="text"
                  name="quantity"
                  defaultValue={prefill.quantity}
                />
                <select name="unit" defaultValue={prefill.unit}>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                </select>
                <textarea
                  name="reason"
                  defaultValue={prefill.reason}
                ></textarea>
                <input type="submit" className="border-2 border-black" />
              </Form>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className="mx-auto flex-shrink-0 flex items-center
                   justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0
                    sm:h-10 sm:w-10"
                  >
                    <ExclamationIcon
                      className="h-6 w-6 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Change Mute for User(s)
                    </Dialog.Title>
                    <div className="mt-2">
                      <Form method="post">
                        <div className="space-x-4 space-y-4">
                          <div className="relative">
                            <input
                              type="textbox"
                              id="quantity"
                              className="text-sm text-gray-900 bg-gray-50
                                  rounded-lg border border-gray-300 focus:ring-gray-600
                                  focus:border-gray-600 text-center"
                              placeholder="Length"
                              required
                            />
                            <TimeUnitDropdown />
                          </div>
                          <textarea
                            className="w-full text-sm text-gray-900
                                  bg-gray-50 rounded-lg border border-gray-300
                                  focus:ring-gray-600 focus:border-gray-600 text-center"
                            placeholder="Reason"
                            required
                          />
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="button"
                  style={{ backgroundColor: "#EAB308", color: "#0F172A" }}
                  onClick={() => openHook[1](false)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="button"
                  style={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                  onClick={() => openHook[1](false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

function getPrefill(selectedMembers: any[]): {
  quantity: string;
  unit: string;
  reason: string;
} {
  let duration = selectedMembers[0].muteDuration;
  if (selectedMembers.some((member) => member.muteDuration !== duration)) {
    duration = 60;
  }
  let reason = selectedMembers[0].muteReason;
  if (selectedMembers.some((member) => member.muteReason !== reason)) {
    reason = "";
  }

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  let quantity: number;
  let unit: string;
  if (duration < hour) {
    quantity = Math.floor(duration / minute);
    unit = "minutes";
  } else if (duration < day) {
    quantity = Math.floor(duration / hour);
    unit = "hours";
  } else if (duration < week) {
    quantity = Math.floor(duration / day);
    unit = "days";
  } else {
    quantity = Math.floor(duration / week);
    unit = "weeks";
  }

  return {
    quantity: quantity.toString(),
    unit,
    reason,
  };
}
