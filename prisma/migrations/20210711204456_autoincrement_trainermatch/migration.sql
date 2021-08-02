-- AlterTable
CREATE SEQUENCE "trainermatch_id_seq";
ALTER TABLE "TrainerMatch" ALTER COLUMN "id" SET DEFAULT nextval('trainermatch_id_seq');
ALTER SEQUENCE "trainermatch_id_seq" OWNED BY "public"."TrainerMatch"."id";
