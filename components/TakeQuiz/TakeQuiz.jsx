"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import Health from "./Health";
import { IoMdInfinite } from "react-icons/io";

function TakeQuiz() {
  const [data, setData] = useState({});
  const [background, setBackground] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([""]);
  const [number, setNumber] = useState(0);
  const params = useParams();

  useEffect(() => {
    async function getQuestions() {
      const id = params.id;
      const res = await fetch(`/api/quizzes/${id}`);
      const data = await res.json();
      setData(data.quiz);
      setQuestions(data.quiz.questions);
    }

    getQuestions();
  }, []);

  const changeBackgroundColor = () => {
    setBackground("bg-red-500");
    setTimeout(() => {
      setBackground("");
    }, 1000);
  };

  return (
    <div className={`${background} p-3`}>
      <div className="ps-3 py-3 border border-primary rounded w-2/12">
        {isNaN(data.time) ? (
          <p className="text-lg">
            Remaining Time:{" "}
            <IoMdInfinite className="inline text-3xl text-blue-600" />
          </p>
        ) : (
          <Timer initialTime={data.time} />
        )}
        {isNaN(data.health) ? (
          <p className="text-lg">
            HP: <IoMdInfinite className="inline text-3xl text-red-600" />
          </p>
        ) : (
          <Health points={data.health} />
        )}
        <p className="text-lg">Score: {score}</p>
      </div>
      <div className="text-center mt-5">
        <h1 className=" text-4xl">Question</h1>
        <p className="text-2xl">{questions[number].question}</p>
        {questions[number].questionType === "identification" && (
          <input
            type="text"
            placeholder="Type your answer here"
            className="input input-primary"
          />
        )}
        {/* {data.questions[number].question} */}
        {/* <p className="text-2xl">{data.questions.at(Number(number)).question}</p>
        {data.questions[Number(number)].questionType === "identification" && (
          <input
            type="text"
            placeholder="Type your answer here"
            className="input input-primary"
          /> 
        )} */}
      </div>

      <button onClick={() => console.log(data)}>Try</button>
    </div>
  );
}

export default TakeQuiz;
