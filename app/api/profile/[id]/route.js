import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (req, {params}) => {
  try {
    const body = await req.json();
    const { nama_institusi, telepon, email, alamat, latitude, longitude, logo } = body
    const profile = await db.profile.update({
      where: {
        id: Number(params.id)
      }, 
      data: {
        nama_institusi,
        telepon, 
        email, 
        alamat, 
        latitude, 
        longitude,
        logo
      }
    })
    return NextResponse.json(profile, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}