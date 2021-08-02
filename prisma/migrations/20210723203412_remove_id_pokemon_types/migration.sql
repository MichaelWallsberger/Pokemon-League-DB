/*
  Warnings:

  - The migration will change the primary key for the `PokemonTypes` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PokemonTypes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PokemonTypes" DROP CONSTRAINT "PokemonTypes_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("pokemon", "type");
