import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

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
    mutedSince: Date | undefined;
    mutedDuration: number | undefined;
    banned: boolean;
  },
  "mutedSince" | "mutedDuration"
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
    muted: {
      isNot: undefined,
    },
    banned: false,
  };
  if (modifier === "muted") {
    where.muted.isNot = null;
  }
  if (modifier === "banned") {
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
    mutedSince: member.muted?.since,
    mutedDuration: member.muted?.duration,
    banned: member.banned,
  }));
}
