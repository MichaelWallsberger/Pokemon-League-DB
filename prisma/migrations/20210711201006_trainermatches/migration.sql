/*
  Warnings:

  - You are about to drop the column `timeEventId` on the `TrainerMatch` table. All the data in the column will be lost.
  - Added the required column `timeEvent` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrainerMatch" DROP CONSTRAINT "TrainerMatch_timeEventId_fkey";

-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "timeEvent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainerMatch" DROP COLUMN "timeEventId";

-- AlterTable
ALTER TABLE "Trainers" ADD COLUMN     "trainer1Id" INTEGER,
ADD COLUMN     "trainer2Id" INTEGER;

-- AddForeignKey
ALTER TABLE "Matches" ADD FOREIGN KEY ("timeEvent") REFERENCES "TimeEvent"("event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainers" ADD FOREIGN KEY ("trainer1Id") REFERENCES "TrainerMatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainers" ADD FOREIGN KEY ("trainer2Id") REFERENCES "TrainerMatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
