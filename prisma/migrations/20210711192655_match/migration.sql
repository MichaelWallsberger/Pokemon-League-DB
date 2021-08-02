/*
  Warnings:

  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainerMatche` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_timeEventId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_winnerName_fkey";

-- DropForeignKey
ALTER TABLE "TrainerMatche" DROP CONSTRAINT "TrainerMatche_matchId_fkey";

-- DropForeignKey
ALTER TABLE "TrainerMatche" DROP CONSTRAINT "TrainerMatche_trainerName_fkey";

-- CreateTable
CREATE TABLE "Matches" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "trainersName" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerMatch" (
    "id" INTEGER NOT NULL,
    "timeEventId" TEXT NOT NULL,
    "winnerName" TEXT NOT NULL,
    "matchesId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Match";

-- DropTable
DROP TABLE "TrainerMatche";

-- AddForeignKey
ALTER TABLE "Matches" ADD FOREIGN KEY ("trainersName") REFERENCES "Trainers"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("timeEventId") REFERENCES "TimeEvent"("event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("winnerName") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("matchesId") REFERENCES "Matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
