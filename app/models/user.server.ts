import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

// Find a user with its discord id
// Create user if it doesn't exist
// Update its display name if it changed
export async function getMatchingUser(
  discordId: User["discordId"],
  displayName: User["displayName"]
) {
  const user = await prisma.user.findUnique({
    where: { discordId },
  });
  if (user == null) {
    return prisma.user.create({
      data: {
        discordId,
        displayName,
      },
    });
  }
  if (user.displayName !== displayName) {
    prisma.user.update({
      where: { id: user.id },
      data: { displayName },
    });
  }
  return user;
}
