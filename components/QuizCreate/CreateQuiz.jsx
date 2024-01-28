"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import CreateQuestions from "./CreateQuestions";
import QuestionList from "./QuestionList";

function CreateQuiz() {
  const quiz = useSelector((state) => state.quiz);
  const router = useRouter();

  async function createQuiz() {
    const res = await fetch("/api/quizzes/createQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });

    console.log(quiz);
    if (res.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="h-full w-full">
      <div className="flex w-full h-5/6">
        <div className="grid h-full flex-auto card bg-base-300 rounded-box p-3 place-items-center relative">
          <CreateQuestions />
        </div>
        <div className="divider divider-horizontal" />
        <div className="grid h-full flex-auto card bg-base-300 rounded-box p-3">
          <QuestionList />
        </div>
      </div>
      <button
        className="btn btn-lg btn-error float-start mt-3"
        onClick={router.back}
      >
        Back
      </button>
      <button
        className="btn btn-primary mt-3 btn-lg float-end"
        onClick={createQuiz}
      >
        Create Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
