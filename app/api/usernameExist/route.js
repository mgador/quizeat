import connectDB from "@/lib/connectDB";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { username } = await req.json();
    const userUsername = await User.findOne({ username }).select("_id");
    return NextResponse.json({ userUsername });
  } catch (error) {
    console.log(error);
  }
}
