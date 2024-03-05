/*
  Warnings:

  - The values [ACTIVE,NONACTIVE] on the enum `StatusUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusUser_new" AS ENUM ('Aktif', 'Nonaktif');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "StatusUser_new" USING ("status"::text::"StatusUser_new");
ALTER TYPE "StatusUser" RENAME TO "StatusUser_old";
ALTER TYPE "StatusUser_new" RENAME TO "StatusUser";
DROP TYPE "StatusUser_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'Aktif';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'Aktif';
