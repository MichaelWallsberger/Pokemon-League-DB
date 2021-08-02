/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[index]` on the table `Division`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "Division" ADD COLUMN     "index" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Division.index_unique" ON "Division"("index");
