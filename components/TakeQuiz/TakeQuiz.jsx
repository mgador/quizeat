"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import Health from "./Health";
import { IoMdInfinite } from "react-icons/io";
import EndQuizModal from "./EndQuizModal";

function TakeQuiz() {
  const [data, setData] = useState({});
  const [background, setBackground] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([""]);
  const [number, setNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [health, setHealth] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    async function getQuestions() {
      const id = params.id;
      const res = await fetch(`/api/quizzes/${id}`);
      const data = await res.json();
      setData(data.quiz);
      setHealth(data.quiz.health);
      setQuestions(data.quiz.questions);
    }

    getQuestions();
  }, []);

  const changeBackgroundColor = (color) => {
    setBackground(color);
    setTimeout(() => {
      setBackground("");
    }, 500);
  };

  function handleTimesUp() {
    setMessage("Times Up!");
    document.getElementById("endquiz").showModal();
  }

  function submitAnswer() {
    if (number === questions.length - 1) {
      if (answer.toLowerCase() === questions[number].answer.toLowerCase()) {
        changeBackgroundColor("bg-green-500");
        setScore((prev) => prev + 1);
      }
      changeBackgroundColor("bg-red-500");

      // TODO: POST TO QUIZ PARTICIPANTS
      setMessage("Congratulations!");
      document.getElementById("endquiz").showModal();
      return;
    }

    if (answer.toLowerCase() === questions[number].answer.toLowerCase()) {
      changeBackgroundColor("bg-green-500");
      setAnswer("");
      setScore((prev) => prev + 1);
      setNumber((prev) => prev + 1);
      return;
    }
    changeBackgroundColor("bg-red-500");
    setAnswer("");
    setHealth((prev) => prev - 1);
    setNumber((prev) => prev + 1);
  }

  return (
    <div className={`${background} p-3 relative h-screen`}>
      <div className="ps-3 py-3 border border-primary rounded w-2/12">
        {isNaN(data.time) || data.time === "" ? (
          <p className="text-lg">
            Remaining Time:{" "}
            <IoMdInfinite className="inline text-3xl text-blue-600" />
          </p>
        ) : (
          <Timer initialTime={data.time} handleTimesUp={handleTimesUp} />
        )}
        {isNaN(health) ? (
          <p className="text-lg">
            HP: <IoMdInfinite className="inline text-3xl text-red-600" />
          </p>
        ) : (
          <Health points={health} />
        )}
        <p className="text-lg">Score: {score}</p>
      </div>
      <div className="text-center mt-5">
        <h1 className=" text-4xl text-blue-500 mb-5">Question</h1>
        <p className="text-2xl mb-40">{questions[number].question}</p>
        {questions[number].questionType === "identification" && (
          <input
            type="text"
            placeholder="Type your answer here"
            value={answer}
            className="input input-primary"
            onChange={(e) => setAnswer(e.target.value)}
          />
        )}
        {questions[number].questionType === "multipleChoice" && (
          <div className="text-center">
            {questions[number].choices.map((choice) => (
              <button
                className={`btn btn-primary me-1${
                  answer === choice
                    ? " bg-indigo-700 text-white hover:bg-indigo-700"
                    : ""
                }`}
                onClick={(e) => setAnswer(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        )}
        {questions[number].questionType === "tof" && (
          <div>
            <button
              className={`btn btn-primary me-3 ${
                answer === "true"
                  ? "bg-indigo-700 text-white hover:bg-indigo-700"
                  : ""
              }`}
              value="true"
              onClick={() => setAnswer("true")}
            >
              True
            </button>
            <button
              className={`btn btn-primary  ${
                answer === "false"
                  ? "bg-indigo-700 text-white hover:bg-indigo-700"
                  : ""
              }`}
              value="false"
              onClick={() => setAnswer("false")}
            >
              False
            </button>
          </div>
        )}
      </div>
      <button
        className="absolute bottom-5 right-5 btn btn-primary text-white "
        onClick={submitAnswer}
      >
        {number < questions.length - 1 ? "Next Question" : "Finish"}
      </button>

      <progress
        className="progress w-full left-0 bottom-0 absolute"
        value={number}
        max={questions.length - 1}
      ></progress>
      <EndQuizModal score={score} msg={message} />
    </div>
  );
}

export default TakeQuiz;
