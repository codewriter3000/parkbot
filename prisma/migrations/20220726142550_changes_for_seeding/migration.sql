-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "discordUserId" TEXT NOT NULL,
    CONSTRAINT "User_discordUserId_fkey" FOREIGN KEY ("discordUserId") REFERENCES "DiscordUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("discordUserId", "id", "username") SELECT "discordUserId", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_discordUserId_key" ON "User"("discordUserId");
CREATE TABLE "new_DiscordMember" (
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "nickname" TEXT,
    "banned" BOOLEAN NOT NULL,
    "muteId" TEXT,

    PRIMARY KEY ("userId", "serverId"),
    CONSTRAINT "DiscordMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DiscordUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DiscordMember_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "DiscordServer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DiscordMember_muteId_fkey" FOREIGN KEY ("muteId") REFERENCES "Mute" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DiscordMember" ("banned", "muteId", "nickname", "serverId", "userId") SELECT "banned", "muteId", "nickname", "serverId", "userId" FROM "DiscordMember";
DROP TABLE "DiscordMember";
ALTER TABLE "new_DiscordMember" RENAME TO "DiscordMember";
CREATE UNIQUE INDEX "DiscordMember_muteId_key" ON "DiscordMember"("muteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
