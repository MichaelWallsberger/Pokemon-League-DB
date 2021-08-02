/*
  Warnings:

  - You are about to drop the column `attitude1Id` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `attitude2Id` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `trainer1Id` on the `Trainers` table. All the data in the column will be lost.
  - You are about to drop the column `trainer2Id` on the `Trainers` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[prevPokemon]` on the table `PokemonReroll`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[newPokemon]` on the table `PokemonReroll`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[trainer1String]` on the table `TrainerMatch`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[trainer2String]` on the table `TrainerMatch`. If there are existing duplicate values, the migration will fail.
  - Added the required column `prevPokemon` to the `PokemonReroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newPokemon` to the `PokemonReroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer1String` to the `TrainerMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer2String` to the `TrainerMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_attitude1Id_fkey";

-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_attitude2Id_fkey";

-- DropForeignKey
ALTER TABLE "Trainers" DROP CONSTRAINT "Trainers_trainer1Id_fkey";

-- DropForeignKey
ALTER TABLE "Trainers" DROP CONSTRAINT "Trainers_trainer2Id_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "attitude1Id",
DROP COLUMN "attitude2Id";

-- AlterTable
ALTER TABLE "PokemonReroll" ADD COLUMN     "prevPokemon" INTEGER NOT NULL,
ADD COLUMN     "newPokemon" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TrainerMatch" ADD COLUMN     "trainer1String" TEXT NOT NULL,
ADD COLUMN     "trainer2String" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainers" DROP COLUMN "trainer1Id",
DROP COLUMN "trainer2Id";

-- CreateIndex
CREATE UNIQUE INDEX "PokemonReroll_prevPokemon_unique" ON "PokemonReroll"("prevPokemon");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonReroll_newPokemon_unique" ON "PokemonReroll"("newPokemon");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerMatch_trainer1String_unique" ON "TrainerMatch"("trainer1String");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerMatch_trainer2String_unique" ON "TrainerMatch"("trainer2String");

-- AddForeignKey
ALTER TABLE "PokemonReroll" ADD FOREIGN KEY ("prevPokemon") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonReroll" ADD FOREIGN KEY ("newPokemon") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("trainer1String") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatch" ADD FOREIGN KEY ("trainer2String") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;
