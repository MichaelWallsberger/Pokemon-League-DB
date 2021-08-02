-- CreateTable
CREATE TABLE "Trainers" (
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL DEFAULT E'',
    "discordName" TEXT NOT NULL,
    "teamNr" INTEGER NOT NULL,
    "divisionName" TEXT NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "TrainerPokemons" (
    "trainerName" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "typeName" TEXT NOT NULL,

    PRIMARY KEY ("trainerName","pokemonId")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "timeEventId" TEXT NOT NULL,
    "winnerName" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeEvent" (
    "event" TEXT NOT NULL,

    PRIMARY KEY ("event")
);

-- CreateTable
CREATE TABLE "TrainerMatche" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "trainerName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PokemonReroll" (
    "id" SERIAL NOT NULL,
    "trainerName" TEXT NOT NULL,
    "typeName" TEXT NOT NULL,
    "timeEventname" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "name" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "borderColor" TEXT NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "dexNr" INTEGER NOT NULL,
    "generation" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isNfe" BOOLEAN NOT NULL,
    "isUber" BOOLEAN NOT NULL,
    "isForm" BOOLEAN NOT NULL,
    "spriteSuffix" TEXT,
    "attitude1Id" INTEGER NOT NULL,
    "attitude2Id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "name" TEXT NOT NULL,
    "pokemonsId" INTEGER,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trainers.teamNr_unique" ON "Trainers"("teamNr");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerMatche.id_unique" ON "TrainerMatche"("id");

-- AddForeignKey
ALTER TABLE "Trainers" ADD FOREIGN KEY ("divisionName") REFERENCES "Division"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerPokemons" ADD FOREIGN KEY ("trainerName") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerPokemons" ADD FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerPokemons" ADD FOREIGN KEY ("typeName") REFERENCES "Type"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("timeEventId") REFERENCES "TimeEvent"("event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD FOREIGN KEY ("winnerName") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatche" ADD FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerMatche" ADD FOREIGN KEY ("trainerName") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonReroll" ADD FOREIGN KEY ("trainerName") REFERENCES "Trainers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonReroll" ADD FOREIGN KEY ("typeName") REFERENCES "Type"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonReroll" ADD FOREIGN KEY ("timeEventname") REFERENCES "TimeEvent"("event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD FOREIGN KEY ("attitude1Id") REFERENCES "PokemonReroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD FOREIGN KEY ("attitude2Id") REFERENCES "PokemonReroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD FOREIGN KEY ("pokemonsId") REFERENCES "Pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
