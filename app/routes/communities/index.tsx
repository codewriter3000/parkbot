import type { LoaderFunction } from "@remix-run/node";

import { requireUser } from "~/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return requireUser(request);
};

export default function CommunityIndex() {
  return (
    <main>
      <p>Select a community or create one</p>
    </main>
  );
}
