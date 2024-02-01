"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import Health from "./Health";
import { IoMdInfinite } from "react-icons/io";
import EndQuizModal from "./EndQuizModal";
import { getSession } from "next-auth/react";

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

  useEffect(() => {
    async function recordQuiz() {
      try {
        const session = await getSession();
        const res = await fetch(`/api/quizzes/${params.id}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: session?.user?.name,
            participantId: session?.user?.id,
            score: score,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (health === 0) {
      recordQuiz();
      const audio = new Audio("/assets/audio/failed.mp3");
      audio.play();
      setMessage("Better luck next time!");
      document.getElementById("endquiz").showModal();
    }
  }, [health]);

  const changeBackgroundColor = (color) => {
    setBackground(color);
    setTimeout(() => {
      setBackground("");
    }, 500);
  };

  async function handleTimesUp() {
    setMessage("Times Up!");

    try {
      const session = await getSession();
      const res = await fetch(`/api/quizzes/${params.id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: session?.user?.name,
          participantId: session?.user?.id,
          score: score,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    const audio = new Audio("/assets/audio/failed.mp3");
    audio.play();
    document.getElementById("endquiz").showModal();
  }

  async function finishQuiz() {
    let updatedScore = score;
    if (answer.toLowerCase() === questions[number].answer.toLowerCase()) {
      changeBackgroundColor("bg-green-500");
      updatedScore++;
      setScore((prev) => prev + 1);
    } else {
      changeBackgroundColor("bg-red-500");
    }

    try {
      const session = await getSession();
      const res = await fetch(`/api/quizzes/${params.id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: session?.user?.name,
          participantId: session?.user?.id,
          score: updatedScore,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setMessage("Congratulations!");
    const audio = new Audio("/assets/audio/complete.wav");
    audio.play();
    document.getElementById("endquiz").showModal();
    return;
  }

  async function submitAnswer() {
    if (answer.toLowerCase() === questions[number].answer.toLowerCase()) {
      changeBackgroundColor("bg-green-500");
      setAnswer("");
      const audio = new Audio("/assets/audio/correctAnswer.wav");
      audio.play();
      setScore((prev) => prev + 1);
      setNumber((prev) => prev + 1);
      return;
    }
    changeBackgroundColor("bg-red-500");
    setAnswer("");
    const audio = new Audio("/assets/audio/wrongAnswer.wav");
    audio.play();
    setHealth((prev) => prev - 1);
    setNumber((prev) => prev + 1);
  }

  return (
    <div className={`${background} p-3 relative h-screen`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          finishQuiz();
        }}
      >
        <div className="ps-3 py-3 border border-primary rounded xl:w-2/12 lg:w-3/12 md:w-4/12 max-sm:text-center max-md:text-center">
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
        <div className="text-center">
          <div className="bg-base-200 xl:w-7/12 rounded text-center mx-auto py-7 my-5 lg:w-6/12">
            <h1 className=" text-4xl text-blue-500 mb-5">Question</h1>
            <p className="text-2xl">{questions[number].question}</p>
          </div>
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
            <div className="text-center grid lg:grid-cols-2">
              {questions[number].choices.map((choice) => (
                <button
                  className={`btn btn-primary me-3 mb-3${
                    answer === choice
                      ? " bg-indigo-700 text-white hover:bg-indigo-700"
                      : ""
                  }`}
                  onClick={() => setAnswer(choice)}
                  type="button"
                >
                  {choice}
                </button>
              ))}
            </div>
          )}
          {questions[number].questionType === "tof" && (
            <div className="grid grid-cols-2 max-sm:grid-cols-1">
              <button
                className={`btn btn-primary lg:me-3 max-sm:mb-3${
                  answer === "true"
                    ? "bg-indigo-700 text-white hover:bg-indigo-700"
                    : ""
                }`}
                value="true"
                onClick={() => setAnswer("true")}
                type="button"
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
                type="button"
              >
                False
              </button>
            </div>
          )}
        </div>
        {number < questions.length && (
          <button
            className="absolute bottom-5 right-5 btn btn-primary text-white "
            type={"button"}
            onClick={() =>
              number < questions.length - 1 ? submitAnswer() : finishQuiz()
            }
          >
            {number < questions.length - 1 ? "Next Question" : "Finish"}
          </button>
        )}
      </form>

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
