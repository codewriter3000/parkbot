const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  console.log(`No seed for now. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
