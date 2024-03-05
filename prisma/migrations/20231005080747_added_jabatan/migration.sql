-- CreateTable
CREATE TABLE "Jabatan" (
    "id" SERIAL NOT NULL,
    "kode_jabatan" TEXT NOT NULL,
    "nama_jabatan" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jabatan_kode_jabatan_key" ON "Jabatan"("kode_jabatan");

-- CreateIndex
CREATE UNIQUE INDEX "Jabatan_nama_jabatan_key" ON "Jabatan"("nama_jabatan");
