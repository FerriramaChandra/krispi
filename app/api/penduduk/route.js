import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// CREATE A NEW Penduduk
export async function POST(request) {
  try {
    const body = await request.json();
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
      tanggal_lahir } = body;

    const newPenduduk = await db.penduduk.create({
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
      },
    });

    return NextResponse.json({ newPenduduk, message: "Penduduk baru berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// GET ALL PENDUDUK
export async function GET(request) {
  const query = request.query;
  const { name } = query;

  if (name) {
    try {
      const pendudukId = await db.penduduk.findUnique({
        where: {
          nama: {
            contains: name,
            mode: "insensitive", // case-insensitive search
          },
        },
        select: {
          id: true,
        },
      });
      return NextResponse.json(pendudukId, { status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
    }
  } else {
    try {
      const allPenduduk = await db.pegawai.findMany({
        select: {
          id: true,
          nama: true,
        }
      });
      return NextResponse.json(allPenduduk, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
    }
  }
}

