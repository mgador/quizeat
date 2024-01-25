import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Quiz from "@/models/Quizzes";

export async function GET() {
  await connectDB();
  const quizzes = await Quiz.find();
  return NextResponse.json({ quizzes });
}
