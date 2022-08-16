import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const discordUserData = [
  {
    id: "1",
    displayName: "John Doe",
  },
  {
    id: "2",
    displayName: "Jane Doe",
  },
  {
    id: "3",
    displayName: "Jack Doe",
  },
  {
    id: "358481146171883520",
    displayName: "abc3354",
  },
  {
    id: "197145017419169793",
    displayName: "baja blast",
  },
  {
    id: "278989797744181249",
    displayName: "iAmThunderLIVE",
  },
];

const userData = [
  {
    username: "abc3354",
    discordUserId: "358481146171883520",
  },
  {
    username: "baja blast",
    discordUserId: "197145017419169793",
  },
  {
    username: "iAmThunderLIVE",
    discordUserId: "278989797744181249",
  },
];

function apply<DataElem, ReturnValue>(
  action: (elem: DataElem) => Promise<ReturnValue>,
  data: DataElem[]
): Promise<ReturnValue[]> {
  return Promise.all(data.map(action));
}

function catchP2025(err: any) {
  // P2025 happens if the record to delete is not found
  // The error if the database is empty during the seed phase (first seed)
  if (err.code !== "P2025") {
    throw err;
  }
}

async function seed() {
  await apply(
    (user) => prisma.discordUser.delete({ where: { id: user.id } }),
    discordUserData
  ).catch(catchP2025);
  await apply((user) => {
    return prisma.discordUser.create({ data: user });
  }, discordUserData);

  await apply((user) => {
    return prisma.user.delete({ where: { username: user.username } });
  }, userData).catch(catchP2025);
  await apply((user) => prisma.user.create({ data: user }), userData);

  await prisma.discordServer
    .delete({
      where: {
        id: "1",
      },
    })
    .catch(catchP2025);
  await prisma.discordServer.create({
    data: {
      id: "1",
      name: "Seeded community",
      admins: {
        connect: userData.map((user) => {
          return {
            discordUserId: user.discordUserId,
          };
        }),
      },
      members: {
        create: discordUserData.map((user) => {
          return {
            user: {
              connect: {
                id: user.id,
              },
            },
            nickname: user.displayName + " (nickname)",
            muted:
              user.id === "2"
                ? {
                    create: {
                      duration: 10000000,
                      reason: "Muted by seeding script",
                    },
                  }
                : undefined,
            banned: user.id === "3",
          };
        }),
      },
    },
  });

  console.log(`Database seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
