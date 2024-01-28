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
    health,
    category,
    time,
    takes,
  } = await req.json();

  await connectDB();
  await Quiz.create({
    title,
    author,
    authorId,
    description,
    questions,
    health,
    category,
    time,
    takes,
  });

  return NextResponse.json({ message: "Quiz Created" }, { status: 201 });
}
