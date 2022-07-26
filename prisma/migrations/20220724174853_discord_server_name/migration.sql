/*
  Warnings:

  - Added the required column `name` to the `DiscordServer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordServer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_DiscordServer" ("id") SELECT "id" FROM "DiscordServer";
DROP TABLE "DiscordServer";
ALTER TABLE "new_DiscordServer" RENAME TO "DiscordServer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
