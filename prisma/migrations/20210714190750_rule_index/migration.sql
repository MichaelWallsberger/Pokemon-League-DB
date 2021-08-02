/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[index]` on the table `Rule`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "index" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rule.index_unique" ON "Rule"("index");
