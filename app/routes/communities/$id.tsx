import * as React from "react";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";

import { requireUser } from "~/auth.server";
import type { Community, Member } from "~/models/discord.server";
import {
  checkAdminRights,
  getCommunityById,
  getCommunityMembers,
} from "~/models/discord.server";
import { MemberListTable } from "~/components/MemberListTable";

type LoaderData = {
  community: Community;
  members: Member[];
  listToDisplay: "members" | "muted" | "banned" | "admins";
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUser(request);
  invariant(params.id, "Community id is required");

  const community = await getCommunityById(params.id);
  if (!community || !(await checkAdminRights(user, community))) {
    throw new Response("Community not found", {
      status: 404,
    });
  }

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
    members: await getCommunityMembers(community, listToDisplay),
    listToDisplay,
  };

  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  return null;
};

export default function CommunityDetails() {
  const data = useLoaderData<LoaderData>();

  const accentColor = {
    members: "green",
    muted: "yellow",
    banned: "red",
    admins: "green",
  }[data.listToDisplay];

  const title = {
    members: "All Members",
    muted: "Muted",
    banned: "Banned",
    admins: "Administrators",
  }[data.listToDisplay];

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
      <div className="text-center text-2xl py-4">{title}</div>

      <div className="text-sm font-medium text-center text-gray-500">
        <ul className="flex content-center gap-x-3">
          <li className="mr-2">
            <a
              href="?display=members"
              className={`${
                data.listToDisplay == "members"
                  ? "active text-green-700 border-green-700"
                  : "hover:text-green-700 hover:border-green-700"
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

      <MemberListTable
        members={data.members}
        accentColor={accentColor}
        tableType={data.listToDisplay}
      />
    </Form>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div>
      <b>An unexpected error occurred</b>
      <pre>{error.message}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div>
        <b>Community not found</b>
      </div>
    );
  }

  throw new Error(
    `Unexpected caught response with status: ${caught.status} \n${caught.data}`
  );
}
