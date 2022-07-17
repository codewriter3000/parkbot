import { createCookieSessionStorage } from "@remix-run/node";

import { Authenticator } from "remix-auth";
import { DiscordStrategy, SocialsProvider } from "remix-auth-socials";
import invariant from "tiny-invariant";

import type { User } from "~/models/user.server";
import { getMatchingUser } from "~/models/user.server";

invariant(process.env["DISCORD_CLIENT_ID"], "DISCORD_CLIENT_ID is required");
invariant(
  process.env["DISCORD_CLIENT_SECRET"],
  "DISCORD_CLIENT_SECRET is required"
);

let address = "http://localhost:3000";
if (process.env.NODE_ENV === "production") {
  invariant(process.env["FLY_APP_NAME"], "FLY_APP_NAME is required");
  address = `https://${process.env["FLY_APP_NAME"]}.fly.dev`;
}

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export let authenticator = new Authenticator(sessionStorage, {
  sessionKey: "_session",
});

authenticator.use(
  new DiscordStrategy(
    {
      clientID: process.env["DISCORD_CLIENT_ID"],
      clientSecret: process.env["DISCORD_CLIENT_SECRET"],
      callbackURL: `${address}/auth/${SocialsProvider.DISCORD}/callback`,
      scope: ["identify"],
    },
    async ({ profile }) => {
      return getMatchingUser(profile.id, profile.displayName);
    }
  )
);

export async function getUser(request: Request) {
  const user = await authenticator.isAuthenticated(request);
  return user as User | null;
}

export async function requireUser(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const user = await getUser(request);
  if (user == null) {
    throw await authenticator.authenticate("discord", request, {
      successRedirect: redirectTo,
    });
  }
  return user;
}
