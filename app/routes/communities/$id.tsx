import * as React from "react";
import { Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { requireUser } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return requireUser(request);
};

export default function CommunityDetails() {
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
              href="/communities/members"
              className="active inline-block p-4 rounded-t-lg border-b-2 border-transparent text-blue-600 border-blue-600"
            >
              All Members
            </a>
          </li>
          <li className="mr-2">
            <a
              href="/communities/muted"
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400"
            >
              Muted
            </a>
          </li>
          <li className="mr-2">
            <a
              href="/communities/banned"
              className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:border-red-600 hover:text-red-600"
            >
              Banned
            </a>
          </li>
          <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
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
        <tbody></tbody>
      </table>
    </Form>
  );
}
