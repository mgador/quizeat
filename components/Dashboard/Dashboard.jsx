"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className=" h-screen">
      <div className="hero min-h-screen">
        <div className="text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{`Welcome, ${session?.user?.name}`}</h1>
            <p className="py-6">
              The ultimate quiz creation and sharing platform! Unleash your
              creativity by crafting quizzes on any topic imaginable. Challenge
              friends, family, and the QuizEat community to test their
              knowledge. It's your time to shine as the quizmaster – create your
              quiz now and join the fun at QuizEat!
            </p>
            <Link href="/createQuiz" className="btn btn-primary">
              Create Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
