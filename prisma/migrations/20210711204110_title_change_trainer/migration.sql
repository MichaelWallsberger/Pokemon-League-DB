/*
  Warnings:

  - You are about to drop the column `trainer1String` on the `TrainerMatch` table. All the data in the column will be lost.
  - You are about to drop the column `trainer2String` on the `TrainerMatch` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[trainer1]` on the table `TrainerMatch`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[trainer2]` on the table `TrainerMatch`. If there are existing duplicate values, the migration will fail.
  - Added the required column `trainer1` to the `TrainerMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer2` to the `TrainerMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TrainerMatch_trainer2String_unique";

-- DropIndex
DROP INDEX "TrainerMatch_trainer1String_unique";

-- DropForeignKey
ALTER TABLE "TrainerMatch" DROP CONSTRAINT "TrainerMatch_trainer1String_fkey";

-- DropForeignKey
ALTER TABLE "TrainerMatch" DROP CONSTRAINT "TrainerMatch_trainer2String_fkey";

-- AlterTable
ALTER TABLE "TrainerMatch" DROP COLUMN "trainer1String",
DROP COLUMN "trainer2String",
ADD COLUMN     "trainer1" TEXT NOT NULL,
ADD COLUMN     "trainer2" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TrainerMatch_trainer1_unique" ON "TrainerMatch"("trainer1");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerMatch_trainer2_unique" ON "TrainerMatch"("trainer2");

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("trainer1") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("trainer2") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;
