import type { LoaderFunction } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { authenticator } from "~/auth.server";
import { ParkbotButton } from "~/components/ParkbotButton";

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return { user };
};

export default function Dashboard() {
  const { user } = useLoaderData();

  const data = {
    noteListItems: [{ id: 'test', title: 'test community' }]
  }

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <button className={"button"}>Toggle Communities</button>
        {/* <ParkbotButton text="Toggle Communities" action={() => {}}/> */}
        <p>{user.displayName}</p>
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
          <Link to="new" className="block p-4 text-xl text-green-700">
            + Add a community
          </Link>

          <hr />

          {data.noteListItems.length === 0 ? (
            <p className="p-4">No communities yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={note.id}
                  >
                    {note.title}
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
  )
};