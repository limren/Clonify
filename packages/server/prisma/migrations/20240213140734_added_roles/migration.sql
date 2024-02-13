-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'ARTIST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
