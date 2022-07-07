import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

// import { createNote } from "~/models/note.server";
// import { requireUserId } from "~/session.server";

// import { authenticator } from "~/auth.server"

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
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
        Members
      </div>

      <table className="table-auto">
        <thead>
            <tr>
                <th>Nickname</th>
                <th>Username</th>
                <th>User ID</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>alex</th>
                <th>baja blast#0001</th>
                <th>197145017419169793</th>
                <th></th>
            </tr>
        </tbody>
      </table>
    </Form>
  );
}
