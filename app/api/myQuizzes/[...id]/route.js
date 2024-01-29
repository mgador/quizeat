import connectDB from "@/lib/connectDB";
import Quiz from "@/models/Quizzes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const quizzes = await Quiz.find({ authorId: id });
  return NextResponse.json({ quizzes }, { status: 200 });
}
