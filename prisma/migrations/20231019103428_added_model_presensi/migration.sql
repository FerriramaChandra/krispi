-- AlterTable
ALTER TABLE "Jabatan" ALTER COLUMN "keterangan" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Presensi" (
    "id" SERIAL NOT NULL,
    "tanggal" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jam_masuk" TIME(0) NOT NULL,
    "jam_keluar" TIME(0),
    "status" TEXT NOT NULL,
    "keterangan" TEXT,
    "pegawaiId" INTEGER NOT NULL,

    CONSTRAINT "Presensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_pegawaiId_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "Pegawai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
