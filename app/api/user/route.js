import { db } from "@/app/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// REGISTER A NEW USER
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, username, email, password } = body;

    // check if username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json({ user: null, message: "Username is already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// GET All User
export async function GET() {
  const allUsers = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      password: true,
      status: true,
      createdAt: true
    }
  })
  return NextResponse.json(allUsers, { status: 200 });
}