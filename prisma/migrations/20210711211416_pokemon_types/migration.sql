/*
  Warnings:

  - You are about to drop the column `pokemonsId` on the `Type` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_pokemonsId_fkey";

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "pokemonsId";

-- CreateTable
CREATE TABLE "PokemonTypes" (
    "id" SERIAL NOT NULL,
    "pokemon" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PokemonTypes" ADD FOREIGN KEY ("pokemon") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTypes" ADD FOREIGN KEY ("type") REFERENCES "Type"("name") ON DELETE CASCADE ON UPDATE CASCADE;
