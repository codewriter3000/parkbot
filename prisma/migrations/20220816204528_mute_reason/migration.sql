/*
  Warnings:

  - Added the required column `reason` to the `Mute` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "since" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "reason" TEXT NOT NULL
);
INSERT INTO "new_Mute" ("duration", "id", "since") SELECT "duration", "id", "since" FROM "Mute";
DROP TABLE "Mute";
ALTER TABLE "new_Mute" RENAME TO "Mute";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
