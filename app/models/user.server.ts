import type { User, DiscordUser } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByDiscordData(
  discordUserId: string,
  displayName: string
) {
  const discordUser = await getDiscordUser(discordUserId, displayName);
  const user = await prisma.user.findUnique({
    where: { discordUserId: discordUser.id },
  });

  if (user == null) {
    return await prisma.user.create({
      data: {
        username: discordUser.displayName,
        discord: {
          connect: {
            id: discordUser.id,
          },
        },
      },
    });
  }

  if (user.username != discordUser.displayName) {
    return await prisma.user.update({
      where: { id: user.id },
      data: { username: discordUser.displayName },
    });
  }

  return user;
}

// Find, update, create a discord user matching the id
export async function getDiscordUser(
  id: DiscordUser["id"],
  displayName: DiscordUser["displayName"]
) {
  const discordUser = await prisma.discordUser.findUnique({
    where: { id },
  });

  if (discordUser == null) {
    return await prisma.discordUser.create({
      data: {
        id,
        displayName,
      },
    });
  }

  if (discordUser.displayName !== displayName) {
    return await prisma.discordUser.update({
      where: { id },
      data: { displayName },
    });
  }

  return discordUser;
}
