-- AlterTable
ALTER TABLE "Presensi" ALTER COLUMN "jam_masuk" DROP DEFAULT,
ALTER COLUMN "jam_masuk" SET DATA TYPE TIMETZ(6),
ALTER COLUMN "jam_keluar" SET DATA TYPE TIMETZ(6);
