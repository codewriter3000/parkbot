/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `discordUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DiscordUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DiscordServer" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "DiscordMember" (
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "nickname" TEXT,
    "banned" BOOLEAN NOT NULL,
    "muteId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "serverId"),
    CONSTRAINT "DiscordMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DiscordUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DiscordMember_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "DiscordServer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DiscordMember_muteId_fkey" FOREIGN KEY ("muteId") REFERENCES "Mute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "since" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscordServerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DiscordServerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "DiscordServer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DiscordServerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "discordUserId" TEXT NOT NULL,
    CONSTRAINT "User_discordUserId_fkey" FOREIGN KEY ("discordUserId") REFERENCES "DiscordUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_discordUserId_key" ON "User"("discordUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "DiscordMember_muteId_key" ON "DiscordMember"("muteId");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscordServerToUser_AB_unique" ON "_DiscordServerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscordServerToUser_B_index" ON "_DiscordServerToUser"("B");
