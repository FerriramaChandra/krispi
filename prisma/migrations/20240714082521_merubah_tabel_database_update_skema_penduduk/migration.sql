/*
  Warnings:

  - You are about to drop the `Jabatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pegawai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Presensi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pegawai" DROP CONSTRAINT "Pegawai_jabatanId_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_pegawaiId_fkey";

-- DropTable
DROP TABLE "Jabatan";

-- DropTable
DROP TABLE "Pegawai";

-- DropTable
DROP TABLE "Presensi";

-- CreateTable
CREATE TABLE "Penduduk" (
    "id" SERIAL NOT NULL,
    "nik" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TEXT NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "alamat" TEXT,
    "golongan_darah" TEXT NOT NULL,
    "kontur_wajah" TEXT,
    "agama" TEXT NOT NULL,
    "status_perkawinan" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "warga_negara" TEXT NOT NULL,
    "berlaku_hingga" TEXT NOT NULL,
    "rt_rw" TEXT NOT NULL,
    "kelurahan_desa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");
