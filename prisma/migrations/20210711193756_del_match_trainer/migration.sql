/*
  Warnings:

  - You are about to drop the column `trainersName` on the `Matches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_trainersName_fkey";

-- AlterTable
ALTER TABLE "Matches" DROP COLUMN "trainersName";
