import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import * as React from "react";
import { MemberListTable } from "~/components/MemberListTable";

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
    { nickname: "!TheSticky-[FDG]", username: "!⛧TheSticky⛧#4205", userID: "447571110406389762" },
    { nickname: "Electric Lizard", username: "Electric Lizard#0324", userID: "917295045978226718" },
    { nickname: "King Anazang [ZNG]", username: "Anazang#0511", userID: "312756102913851393" },
    { nickname: "Pillowcase 🇺🇸 🌈", username: "Pillowcase#2156", userID: "171032390167166976" },
    { nickname: "tinylion", username: "tinylion#1046", userID: "735762334081089596" },
    { nickname: "Otto", username: "Otto#9313", userID: "164884933972721665" },
    { nickname: "Punk the Revolutionary", username: "BansheeBoiii#4890", userID: "458361142318727183" },
    { nickname: "Lewi", username: "kklewi#2911", userID: "510590139085488128" },
    { nickname: "itótele", username: "itótele#0047", userID: "796212003848323112" },
    { nickname: "sneakochat", username: "sneak#2972", userID: "675957822055251969" },
    { nickname: "๏̯͡๏ FεⱠⱠ₳r", username: "Fellar#5115", userID: "286882665414656000" },
    { nickname: "DanteTactics", username: "DanteTactics#5049", userID: "429745031973437442" },
    { nickname: "Magpie (Charlie)", username: "Magpie The Great#3030", userID: "823306121300672532" },
    { nickname: "mur.maria", username: "mariauwu#4943", userID: "984390534921596938" },
    { nickname: "Beetlejuice", username: "Beetlejuice#6054", userID: "738792295062569042" },
    { nickname: "detroyer", username: "detroyer#1952", userID: "292797656344821762" },
    { nickname: "infl0w", username: "infl0w#7137", userID: "213534403459022848" },
    { nickname: "Jillybillysillydillynillychilli", username: "Jillybillysillydillynillychilli#9209", userID: "629746673605804043" },
    { nickname: "Konnor88", username: "Konnor88#0001", userID: "434491690632347659" },
    { nickname: "Nea", username: "Nea#0182", userID: "236590563711778816" },
    { nickname: "PENTAGON1st", username: "PENTAGON1st#7318", userID: "894213735890178100" },
    { nickname: "tatsu", username: "tatsu#8794", userID: "225205222660636674" },
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
        All 
        Members
      </div>

      
      <div className="text-sm font-medium text-center text-gray-500">
          <ul className="flex content-center gap-x-3">
              <li className="mr-2">
                  <a href="/dashboard/members" className="active inline-block p-4 rounded-t-lg border-b-2 border-transparent text-green-700 border-green-700">All Members</a>
              </li>
              <li className="mr-2">
                  <a href="/dashboard/muted" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400">Muted</a>
              </li>
              <li className="mr-2">
                  <a href="/dashboard/banned" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-red-600 hover:text-red-600">Banned</a>
              </li>
              <li>
                  <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Administrators</a>
              </li>
          </ul>
      </div>

      <MemberListTable members={users} />
    </Form>
  );
}

// localhost:3000/dashboard