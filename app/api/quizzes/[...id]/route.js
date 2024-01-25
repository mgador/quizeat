import connectDB from "@/lib/connectDB";
import Quiz from "@/models/Quizzes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const quiz = await Quiz.findOne({ _id: id });
  return NextResponse.json({ quiz }, { status: 200 });
}
