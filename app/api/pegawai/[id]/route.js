import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, {params}) => {
  try {
    const pegawai = await db.pegawai.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(pegawai, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}

export const PATCH = async (req, {params}) => {
  try {
    const body = await req.json();
    const { nama, nip, telepon, tanggal_lahir, tempat_lahir, jenis_kelamin, jabatanId, pangkat, alamat } = body
    const pegawai = await db.pegawai.update({
      where: {
        id: Number(params.id)
      }, 
      data: {
        nama, nip, telepon, tanggal_lahir, tempat_lahir, jenis_kelamin, jabatanId, pangkat, alamat
      }
    })
    return NextResponse.json(pegawai, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}