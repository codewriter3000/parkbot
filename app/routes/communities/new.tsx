import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import * as React from "react";

import { requireUser } from "~/auth.server";
import { createCommunity } from "~/models/discord.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const name = formData.get("name")?.toString();

  if (name == null) {
    return redirect(`/communities`);
  }
  const community = await createCommunity(name, user);
  return redirect(`/communities/${community.id}`);
};

export default function AddCommunityPage() {
  const submit = useSubmit();

  function createFakeCommunity() {
    const name = prompt("Name of the community");
    if (name) {
      const formData = new FormData();
      formData.set("name", name);
      submit(formData, {
        method: "post",
        action: "/communities/new",
      });
    }
  }

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>Add a community to parkbot</div>

      <div className="grid grid-rows-2 grid-flow-col gap-4 py-4">
        <div>
          1. <em>Select community type</em>
        </div>
        <div>
          2. <em>Link parkbot to community</em>
        </div>
        <div>
          <select
            className="form-select appearance-none
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option>Discord</option>
          </select>
        </div>
        <div onClick={createFakeCommunity}>
          <ParkbotButton text="Invite discord bot" />
        </div>
      </div>

      <div className="text-right py-4">
        <button
          type="submit"
          className="rounded bg-gray-400 py-2 px-4 text-white
          hover:bg-slate-700
          focus:bg-slate-900"
        >
          Close
        </button>
      </div>
    </Form>
  );
}
