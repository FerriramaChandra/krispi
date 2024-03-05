import { db } from "@/app/lib/db";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export const DELETE = async (req, {params}) => {
  try {
    const user = await db.user.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(user, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}

export const PATCH = async (req, {params}) => {
  try {
    const body = await req.json();
    const { name, username, email, status, foto, passwordLama, passwordBaru } = body

    if (passwordLama) {
      const existingUser = await db.user.findUnique({
        where: {
          id: Number(params.id)
        },
      });
      const passwordMatch = await compare(passwordLama, existingUser.password);

      if(!passwordMatch) {
        return NextResponse.json({message: "Password Lama Tidak Sesuai"}, {status: 409});
      } 
    }

    if(passwordBaru) {
      var hashedPassword = await hash(passwordBaru, 10);
    }

    const user = await db.user.update({
      where: {
        id: Number(params.id)
      }, 
      data: {
        name,
        username, 
        email, 
        status,
        foto, 
        password: hashedPassword
      }
    })
    return NextResponse.json(user, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}

// GET User By Id
export async function GET(req, {params}) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(user, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Something Went Wrong"}, {status: 500});
  }
}