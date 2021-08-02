/*
  Warnings:

  - You are about to drop the column `matchesId` on the `TrainerMatch` table. All the data in the column will be lost.
  - You are about to drop the `Matches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventString` to the `TrainerMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_timeEvent_fkey";

-- DropForeignKey
ALTER TABLE "TrainerMatch" DROP CONSTRAINT "TrainerMatch_matchesId_fkey";

-- AlterTable
ALTER TABLE "TrainerMatch" DROP COLUMN "matchesId",
ADD COLUMN     "eventString" TEXT NOT NULL;

-- DropTable
DROP TABLE "Matches";

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("eventString") REFERENCES "TimeEvent"("event") ON DELETE CASCADE ON UPDATE CASCADE;
