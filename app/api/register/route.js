import connectDB from "@/lib/connectDB";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, username, email, password } = await req.json();
  await connectDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, username, email, password: hashedPassword });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
