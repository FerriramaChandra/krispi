import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, {params}) => {
  try {
    const presensi = await db.presensi.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(presensi, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}

export const PATCH = async (req, {params}) => {
  try {
    const body = await req.json();
    const { pegawaiId, tanggal, jam_masuk, jam_keluar, status, kehadiran, keterangan } = body
    const presensi = await db.presensi.update({
      where: {
        id: Number(params.id),
      }, 
      data: {
        pegawaiId, tanggal, jam_masuk, jam_keluar, status, kehadiran, keterangan
      }
    })
    return NextResponse.json(presensi, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}