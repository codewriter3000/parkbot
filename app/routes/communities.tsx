import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { useUser } from "~/utils";
import { requireUser } from "~/auth.server";
import type { Community } from "~/models/discord.server";
import { getCommunityList } from "~/models/discord.server";
import { ParkbotButton } from "~/components/ParkbotButton";

type LoaderData = Community[];

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return getCommunityList(user);
};

export default function Communities() {
  const user = useUser();
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <ParkbotButton text="Toggle Communities" action={() => {}} />
        <p>{user.username}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <h1 className="text-3xl font-bold text-center block p-4 border-b">
            <Link to=".">Communities</Link>
          </h1>
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + Add a community
          </Link>

          <hr />

          {data.length === 0 ? (
            <p className="p-4">No communities yet</p>
          ) : (
            <ol>
              {data.map((community) => (
                <li key={community.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={community.id}
                  >
                    {community.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
