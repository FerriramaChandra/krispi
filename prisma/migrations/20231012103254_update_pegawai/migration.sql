/*
  Warnings:

  - You are about to drop the column `golongan` on the `Pegawai` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pegawai" DROP COLUMN "golongan",
ALTER COLUMN "tanggal_lahir" SET DATA TYPE TIMESTAMP(3);
