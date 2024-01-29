import connectDB from "@/lib/connectDB";
import Quiz from "@/models/Quizzes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const quiz = await Quiz.findOne({ _id: id });
  return NextResponse.json({ quiz }, { status: 200 });
}

export async function PATCH(req, { params }) {
  const { name, participantId, score } = await req.json();

  await connectDB();
  try {
    const updateQuiz = await Quiz.findByIdAndUpdate(
      params.id,
      {
        $push: { participants: { name, participantId, score } },
      },
      { new: true }
    );

    return NextResponse.json(updateQuiz);
  } catch (err) {
    console.log("Error updating quiz: ", err.message);
    return NextResponse.json({ status: 500 }, { message: "Error" });
  }
}
