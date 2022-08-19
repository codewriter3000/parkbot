import type { User } from "@prisma/client";

import { prisma } from "~/db.server";
import { randomInt } from "crypto";

export type Community = {
  id: string;
  name: string;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type Member = Optional<
  {
    id: string;
    username: string;
    nickname: string | null;

    muted: boolean;
    muteSince: Date | undefined;
    muteDuration: number | undefined;
    muteReason: string | undefined;

    banned: boolean;
  },
  "muteSince" | "muteDuration" | "muteReason"
>;

export async function getCommunityList(user: User): Promise<Community[]> {
  const list = await prisma.discordServer.findMany({
    where: {
      admins: {
        some: {
          id: user.id,
        },
      },
    },
  });
  return list.map((server) => ({
    id: server.id,
    name: server.name,
  }));
}

export async function getCommunityById(id: string): Promise<Community | null> {
  const server = await prisma.discordServer.findUnique({
    where: {
      id,
    },
  });
  if (!server) {
    return null;
  }
  return {
    id: server.id,
    name: server.name,
  };
}

export async function checkAdminRights(
  user: User,
  community: Community
): Promise<boolean> {
  const server = await prisma.discordServer.findUnique({
    where: {
      id: community.id,
    },
    include: {
      admins: true,
    },
  });
  if (!server) {
    return false;
  }
  return server.admins.some((admin) => admin.id === user.id);
}

export async function getCommunityMembers(
  community: Community,
  modifier: "members" | "muted" | "banned" | "admins"
): Promise<Member[]> {
  let where: any = {
    serverId: community.id,
    muted: null,
    banned: false,
  };
  if (modifier === "muted") {
    where.muted = {
      isNot: null,
    };
  }
  if (modifier === "banned") {
    where.muted = undefined;
    where.banned = true;
  }
  if (modifier === "admins") {
    where.user = {
      user: {
        communities: {
          some: {
            id: community.id,
          },
        },
      },
    };
  }

  const memberList = await prisma.discordMember.findMany({
    where,
    include: {
      user: {
        include: {
          user: {
            include: {
              communities: true,
            },
          },
        },
      },
      muted: true,
    },
  });

  return memberList.map((member) => ({
    id: member.user.id,
    username: member.user.displayName,
    nickname: member.nickname,
    muted: member.muted != null,
    muteSince: member.muted?.since,
    muteDuration: member.muted?.duration,
    muteReason: member.muted?.reason,
    banned: member.banned,
  }));
}

export async function createCommunity(
  name: string,
  admin: User
): Promise<Community> {
  const users = await prisma.discordUser.findMany();

  const server = await prisma.discordServer.create({
    data: {
      id: randomInt(0, 1000000).toString(),
      name,
      admins: {
        connect: {
          id: admin.id,
        },
      },
      members: {
        create: users.map((user) => ({
          userId: user.id,
          banned: false,
          nickname: user.displayName + " (nickname)",
        })),
      },
    },
  });
  return {
    id: server.id,
    name: server.name,
  };
}

const unitDurations = {
  minutes: 60,
  hours: 60 * 60,
  days: 60 * 60 * 24,
  weeks: 60 * 60 * 24 * 7,
};

export async function muteUsers(
  serverId: string,
  usersId: string[],
  quantity: number,
  unit: "minutes" | "hours" | "days" | "weeks",
  reason: string
) {
  const duration = quantity * unitDurations[unit];

  for (let userId of usersId) {
    await prisma.discordMember.update({
      where: {
        userId_serverId: {
          userId,
          serverId,
        },
      },
      data: {
        muted: {
          upsert: {
            create: {
              duration,
              reason,
            },
            update: {
              since: new Date(),
              duration,
              reason,
            },
          },
        },
      },
    });
  }
}

export async function unmuteUsers(serverId: string, usersId: string[]) {
  for (let userId of usersId) {
    await prisma.discordMember.update({
      where: {
        userId_serverId: {
          userId,
          serverId,
        },
      },
      data: {
        muted: {
          delete: true,
        },
      },
    });
  }
}
