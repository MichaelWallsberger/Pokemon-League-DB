/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[index]` on the table `TimeEvent`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "TimeEvent" ADD COLUMN     "index" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TimeEvent.index_unique" ON "TimeEvent"("index");
