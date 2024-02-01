"use client";

import { usePathname } from "next/navigation";
import { FaClock, FaHeart, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setAuthor,
  setAuthorId,
  setTitle,
  setDescription,
  setTakes,
  setQuestions,
  setId,
} from "@/lib/quizSlice";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

function QuizItem(props) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function checkCount() {
      const session = await getSession();
      let count = 0;
      props.participants?.forEach((participant) => {
        if (participant.participantId === session.user.id) {
          count++;
        }
      });
      setCount(count);
    }

    checkCount();
  }, []);

  return (
    <div className=" card w-48 bg-base-100 mb-5 max-sm:w-64 sm:w-64 md:w-56 lg:w-52 xl:w-48">
      <figure className="relative">
        <img
          src="/assets/images/quiz_placeholder.jpg"
          alt="quiz_bg"
          className=""
        />
        <h2 className="card-title absolute bottom-0 left-0 ms-2 mb-1 font-bold text-pretty text-indigo-50">
          {props.title}
        </h2>
      </figure>
      <div className="card-body relative">
        <p className="absolute top-0 left-0 ms-2 text-slate-500">
          @{props.author}
        </p>
        <button onClick={() => console.log(count)}>try</button>
        <p className=" text-xs justify-center">
          <span>
            <FaClock className="inline me-1" />
            {isNaN(props.time) || props.time === ""
              ? "No Time Limit"
              : props.time + "min"}
          </span>
        </p>
        <p className="text-xs justify-center">
          <FaHeart className="inline me-1" />
          {isNaN(props.health) ? "Unlimited" : props.health}
        </p>
        <p className="text-xs justify-center mb-14">
          <FaPen className="inline me-1" />
          {isNaN(props.takes) ? "Unlimited" : props.takes}
        </p>
        <div className="card-actions justify-end">
          <div className="border border-outline rounded-full mb-7 p-1 text-xs text-center absolute bottom-7 right-2">
            <p>{props.category}</p>
          </div>
        </div>
        <button
          className={`btn btn-primary text-center absolute bottom-0 btn-block left-0 ${
            count >= props.takes && pathname !== "/dashboard/myQuizzes"
              ? " pointer-events-none brightness-50"
              : ""
          }`}
          value={props.quizId}
          onClick={async (e) => {
            if (pathname === "/dashboard/quizzes") {
              props.clickHandler(e.target.value);
              document.getElementById("quizDetails").showModal();
            } else {
              const session = await getSession();
              dispatch(setAuthor(session.user.name));
              dispatch(setAuthorId(session.user.id));
              dispatch(setTitle(props.title));
              dispatch(setDescription(props.description));
              dispatch(setTakes(props.takes));
              dispatch(setQuestions(props.questions));
              dispatch(setId(props.quizId));
              router.push("/dashboard/myQuizzes/edit");
            }
          }}
        >
          {pathname === "/dashboard/myQuizzes"
            ? "Edit"
            : `${count >= props.takes ? "Participated" : "Details"}`}
        </button>
      </div>
    </div>
  );
}

export default QuizItem;
