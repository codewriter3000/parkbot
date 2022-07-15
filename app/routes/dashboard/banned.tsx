import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import * as React from "react";
import { ParkbotButton } from "~/components/ParkbotButton";
import { MemberListRow } from "~/components/MemberListRow";

// import { createNote } from "~/models/note.server";
// import { requireUserId } from "~/session.server";

// import { authenticator } from "~/auth.server"

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const loader: LoaderFunction = async () => {
  return json([
    { nickname: "alex", username: "baja blast#0001", userID: "197145017419169793" },
    { nickname: "Prefix the Pizza Man", username: "Prefix#3544", userID: "754891206177063042" },
    { nickname: "FFFrenchman [VictimOf1984] 🇫🇷", username: "jostf#0424", userID: "445621472556220446" },
    { nickname: "ForcedevilX 🇦🇺 [FDG]", username: "ForcedevilX#2549", userID: "544452118908502032" },
    { nickname: "𝖂𝖔𝖑𝖋𝖗𝖆𝖒 | [ISTGC]", username: "WolfGang#2199", userID: "302514441982050304" },
  ]);
};

export const action: ActionFunction = async ({ request }) => {
  //const userId = await requireUserId(request);

  //const formData = await request.formData();
  //const title = formData.get("title");
  //const body = formData.get("body");

  //if (typeof title !== "string" || title.length === 0) {
  //  return json<ActionData>(
  //    { errors: { title: "Title is required" } },
  //    { status: 400 }
  //  );
  //}

  //if (typeof body !== "string" || body.length === 0) {
  //  return json<ActionData>(
  //    { errors: { body: "Body is required" } },
  //    { status: 400 }
  //  );
  //}

  //const note = await createNote({ title, body, userId });



  return redirect(`/dashboard`);
};

export default function AddCommunityPage() {
  const actionData = useActionData() as ActionData;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const users = useLoaderData();

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

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
      <div className="text-center text-2xl py-4">
        Banned
      </div>

      
      <div className="text-sm font-medium text-center text-gray-500">
          <ul className="flex content-center gap-x-3">
              <li className="mr-2">
                  <a href="/dashboard/members" className="active inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600">All Members</a>
              </li>
              <li className="mr-2">
                  <a href="/dashboard/muted" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400">Muted</a>
              </li>
              <li className="mr-2">
                  <a href="/dashboard/banned" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent border-red-600 text-red-600">Banned</a>
              </li>
              <li>
                  <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Administrators</a>
              </li>
          </ul>
      </div>


      {/* <div className="columns-3 text-center">
        <div className="basis-1/3 border-solid border-2">Nickname</div>
        <div className="basis-1/3 border-solid border-2">Username</div>
        <div className="basis-1/3 border-solid border-2">User ID</div>
      </div> */}

      <table className="table-auto border-collapse border border-slate-500">
        <thead>
            <tr>
                <th className="border border-slate-300 pl-3 py-2 text-left">Nickname</th>
                <th className="border border-slate-300 pl-3 py-2 text-left">Username</th> 
                <th className="border border-slate-300 pl-3 py-2 text-left">User ID</th>
            </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <MemberListRow key={user.username} nickname={user.nickname} username={user.username} userID={user.userID} />
          ))}
        </tbody>
      </table>
    </Form>
  );
}

// localhost:3000/dashboard