/*
  Warnings:

  - Added the required column `playingUp` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxRating` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minRating` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "playingUp" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "maxRating" INTEGER NOT NULL,
ADD COLUMN     "minRating" INTEGER NOT NULL;
