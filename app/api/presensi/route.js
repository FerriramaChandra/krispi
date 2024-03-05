import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// CREATE A NEW PRESENSI
export async function POST(request) {
  try {
    const body = await request.json();
    const { pegawaiId, tanggal, jam_masuk, jam_keluar, kehadiran, status, keterangan } = body;

    const newKehadiran = await db.presensi.create({
      data: {
        pegawaiId, 
        jam_masuk, 
        jam_keluar,
        tanggal, 
        kehadiran, 
        status, 
        keterangan
      },
    });

    return NextResponse.json({ newKehadiran, message: "Data kehadiran berhasil tercatat" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
