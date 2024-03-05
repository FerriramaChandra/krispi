-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'NONACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "StatusUser" NOT NULL DEFAULT 'ACTIVE';
