import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// DELETE PENDUDUK
export const DELETE = async (req, { params }) => {
  try {
    const penduduk = await db.penduduk.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(penduduk, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
  }
}

export const PATCH = async (req, { params }) => {
  try {
    const body = await req.json();
    const {
      agama,
      alamat,
      berlaku_hingga,
      golongan_darah,
      jenis_kelamin,
      kecamatan,
      kelurahan_desa,
      warga_negara,
      nama,
      nik,
      pekerjaan,
      rt_rw,
      status_perkawinan,
      tempat_lahir,
      tanggal_lahir
    } = body
    const penduduk = await db.penduduk.update({
      where: {
        id: Number(params.id)
      },
      data: {
        agama,
        alamat,
        berlaku_hingga,
        golongan_darah,
        jenis_kelamin,
        kecamatan,
        kelurahan_desa,
        warga_negara,
        nama,
        nik,
        pekerjaan,
        rt_rw,
        status_perkawinan,
        tempat_lahir,
        tanggal_lahir
      }
    })
    return NextResponse.json(penduduk, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
  }
}