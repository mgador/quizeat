import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Quiz from "@/models/Quizzes";

export async function POST(req) {
  const {
    title,
    author,
    authorId,
    description,
    questions,
    timeLimit,
    category,
    health,
  } = await req.json();

  await connectDB();
  await Quiz.create({
    title,
    author,
    authorId,
    description,
    questions,
    timeLimit,
    category,
    health,
  });

  return NextResponse.json({ message: "Quiz Created" }, { status: 201 });
}
