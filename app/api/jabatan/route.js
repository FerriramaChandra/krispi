import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

// CREATE A NEW JABATAN
export async function POST(request) {
  try {
    const body = await request.json();
    const { kode_jabatan, nama_jabatan, keterangan } = body;

    const newJabatan = await db.jabatan.create({
      data: {
        kode_jabatan, 
        nama_jabatan, 
        keterangan
      },
    });

    return NextResponse.json({ newJabatan, message: "Jabatan created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// GET ALL JABATAN 
export async function GET(request) {
  try {
    const allJabatan = await db.jabatan.findMany({
      select: {
        id: true,
        kode_jabatan: true,
        nama_jabatan: true,
      }
    });
    return NextResponse.json({ allJabatan }, {status: 200})
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}