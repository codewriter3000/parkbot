import * as React from "react";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";

import { requireUser } from "~/auth.server";
import { MemberListRow } from "~/components/MemberListRow";

// Should be in backend file
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type Member = Optional<
  {
    id: string;
    username: string;
    nickname: string;

    muted: boolean;
    mutedSince: Date | undefined;
    mutedDuration: number | undefined;
    banned: boolean;
  },
  "mutedSince" | "mutedDuration"
>;

type LoaderData = {
  community: {
    id: string;
    name: string;
  }; // should be imported from backend file
  members: Member[];
  listToDisplay: "members" | "muted" | "banned" | "admins";
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUser(request);
  invariant(params.id, "Community id is required");

  // get community details by id
  // if not found, throw 404
  // if user is not admin of community, throw 404 or 403
  const community = {
    id: "1",
    name: "Dummy community",
  };

  const url = new URL(request.url);
  const listToDisplay = url.searchParams.get("display") || "members";
  if (
    listToDisplay != "members" &&
    listToDisplay != "muted" &&
    listToDisplay != "banned" &&
    listToDisplay != "admins"
  ) {
    throw new Response(`Unknown list to display: ${listToDisplay}`, {
      status: 400,
    });
  }

  let data: LoaderData = {
    community,
    members: [],
    listToDisplay,
  };

  const dummyMembers: Member[] = [
    {
      id: "1",
      username: "user1",
      nickname: "User 1",
      muted: false,
      banned: false,
    },
    {
      id: "2",
      username: "user2",
      nickname: "User 2",
      muted: false,
      banned: false,
    },
  ];

  switch (listToDisplay) {
    case "members":
      // get members
      data.members = dummyMembers;
      break;
    case "muted":
      // get muted members
      data.members = dummyMembers;
      break;
    case "banned":
      // get banned members
      data.members = dummyMembers;
      break;
    case "admins":
      // get admins
      data.members = dummyMembers;
      break;
  }

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  return null;
};

export default function CommunityDetails() {
  const data = useLoaderData<LoaderData>();

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
      <div className="text-center text-2xl py-4">All Members</div>

      <div className="text-sm font-medium text-center text-gray-500">
        <ul className="flex content-center gap-x-3">
          <li className="mr-2">
            <a
              href="?display=members"
              className={`${
                data.listToDisplay == "members"
                  ? "active text-blue-600 border-blue-600"
                  : "hover:text-blue-600 hover:border-blue-600"
              } inline-block p-4 rounded-t-lg border-b-2 border-transparent`}
            >
              All Members
            </a>
          </li>
          <li className="mr-2">
            <a
              href="?display=muted"
              className={`${
                data.listToDisplay == "muted"
                  ? "active text-yellow-400 border-yellow-400"
                  : "hover:text-yellow-400 hover:border-yellow-400"
              } inline-block p-4 rounded-t-lg border-b-2 border-transparent`}
            >
              Muted
            </a>
          </li>
          <li className="mr-2">
            <a
              href="?display=banned"
              className={`${
                data.listToDisplay == "banned"
                  ? "active text-red-600 border-red-600"
                  : "hover:text-red-600 hover:border-red-600"
              } inline-block p-4 rounded-t-lg border-b-2 border-transparent`}
            >
              Banned
            </a>
          </li>
          <li>
            <a
              href="?display=admins"
              className={`${
                data.listToDisplay == "admins"
                  ? "active text-green-600 border-green-600"
                  : "hover:text-green-600 hover:border-green-600"
              } inline-block p-4 rounded-t-lg border-b-2 border-transparent`}
            >
              Administrators
            </a>
          </li>
        </ul>
      </div>

      <table className="table-auto border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-300 pl-3 py-2 text-left">
              Nickname
            </th>
            <th className="border border-slate-300 pl-3 py-2 text-left">
              Username
            </th>
            <th className="border border-slate-300 pl-3 py-2 text-left">
              User ID
            </th>
          </tr>
        </thead>
        <tbody>
          {data.members.map((member: any) => (
            <MemberListRow
              key={member.id}
              nickname={member.nickname}
              username={member.username}
              userID={member.id}
            />
          ))}
        </tbody>
      </table>
    </Form>
  );
}
