"use client";

import CancelQuiz from "@/components/QuizCreate/CancelQuiz";
import CancelQuizButton from "@/components/QuizCreate/CancelQuizButton";

function layout({ children }) {
  return (
    <div className="h-screen flex flex-col text-center w-10/12 mx-auto pt-3.5">
      <CancelQuizButton />
      {children}
      <CancelQuiz />
    </div>
  );
}

export default layout;
