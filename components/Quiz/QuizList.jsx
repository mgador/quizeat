"use client";
import { useEffect, useState } from "react";
import QuizItem from "./QuizItem";
import QuizDetails from "./QuizDetails";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    setLoading(true);
    async function getQuizzes() {
      const res = await fetch("/api/quizzes");
      const data = await res.json();
      setQuizzes(data.quizzes);
      setLoading(false);
    }
    getQuizzes();
  }, []);

  async function handleClick(id) {
    const res = await fetch(`/api/quizzes/${id}`);
    const data = await res.json();
    setQuiz(data.quiz);
  }

  return (
    <div className="flex flex-wrap h-auto">
      {loading && <div>Loading...</div>}
      {quizzes.map((item) => (
        <QuizItem
          key={item._id}
          title={item.title}
          author={item.author}
          description={item.description}
          quizId={item._id}
          clickHandler={handleClick}
        />
      ))}
      <QuizDetails
        title={quiz.title}
        description={quiz.description}
        author={quiz.author}
        quizId={quiz._id}
        data={quiz}
      />
    </div>
  );
}

export default QuizList;
