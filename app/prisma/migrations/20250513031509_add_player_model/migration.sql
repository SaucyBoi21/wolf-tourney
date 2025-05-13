/*
  Warnings:

  - You are about to drop the column `Rating` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `Section` on the `Player` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "Rating",
DROP COLUMN "Section",
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "section" TEXT NOT NULL;
