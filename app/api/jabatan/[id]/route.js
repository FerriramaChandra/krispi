import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, {params}) => {
  try {
    const jabatan = await db.jabatan.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(jabatan, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}

export const PATCH = async (req, {params}) => {
  try {
    const body = await req.json();
    const { nama_jabatan, keterangan } = body
    const jabatan = await db.jabatan.update({
      where: {
        id: Number(params.id)
      }, 
      data: {
        nama_jabatan,
        keterangan
      }
    })
    return NextResponse.json(jabatan, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}