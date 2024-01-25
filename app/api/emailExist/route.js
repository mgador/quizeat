import connectDB from "@/lib/connectDB";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    const userEmail = await User.findOne({ email }).select("_id");
    console.log(userEmail);
    return NextResponse.json({ userEmail });
  } catch (error) {
    console.log(error);
  }
}
