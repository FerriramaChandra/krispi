import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// CREATE A NEW PEGAWAI
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, nip, telepon, tempat_lahir, tanggal_lahir, jenis_kelamin, jabatanId, pangkat, alamat } = body;

    const newPegawai = await db.pegawai.create({
      data: {
        nama, 
        nip, 
        telepon, 
        tempat_lahir, 
        tanggal_lahir, 
        jenis_kelamin, 
        jabatanId,
        pangkat, 
        alamat,
      },
    });

    return NextResponse.json({ newPegawai, message: "Pegawai baru berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// GET ALL PEGAWAI
export async function GET(request) {
  const query = request.query;
  const {name} = query;

  if (name) {
    try {
      const pegawaiId = await db.pegawai.findUnique({
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
      return NextResponse.json(pegawaiId, {status: 200});
    } catch (error) {
      console.log(error)
      return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
    }
  } else {
    try {
      const allPegawai = await db.pegawai.findMany({
        select: {
            id: true, 
            nama: true,
            jabatan: {
              select: {
                nama_jabatan: true,
              }
            }
          }
      });
      return NextResponse.json(allPegawai, {status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 });
    }
  }
 
}

