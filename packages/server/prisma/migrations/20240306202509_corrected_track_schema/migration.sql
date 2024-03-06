/*
  Warnings:

  - You are about to drop the column `duration` on the `Track` table. All the data in the column will be lost.
  - Added the required column `minutes` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seconds` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "duration",
ADD COLUMN     "minutes" INTEGER NOT NULL,
ADD COLUMN     "seconds" INTEGER NOT NULL,
ADD COLUMN     "trackPath" TEXT;
