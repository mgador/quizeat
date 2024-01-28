"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthor,
  setAuthorId,
  setDescription,
  setTakes,
  setTitle,
  setTimeLimit,
  setHealth,
  setCategory,
} from "@/lib/quizSlice";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import categories from "@/public/assets/categories";

function CreateDetails() {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [timer, setTimer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function setAuthorDetails() {
      const session = await getSession();
      dispatch(setAuthor(session.user.name));
      dispatch(setAuthorId(session.user.id));
    }
    setAuthorDetails();
  }, []);

  useEffect(() => {
    dispatch(setTimeLimit(""));
  }, [timer]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErr(false);
    }, 3000);

    // Clear the timeout to prevent it from triggering if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [err]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "title") dispatch(setTitle(value));
    else if (name === "description") dispatch(setDescription(value));
    else if (name === "timer") timer && dispatch(setTimeLimit(value));
    else if (name === "category") dispatch(setCategory(value));
    else if (name === "health") dispatch(setHealth(value));
    else dispatch(setTakes(value));
  }

  function isError() {
    if (quiz.title === "" || quiz.description === "") {
      setErr(true);
      setMsg("Fill up all the details");
      return;
    }

    if (quiz.takes === "") {
      setErr(true);
      setMsg("Select take count");
      return;
    }

    if (quiz.category === "") {
      setErr(true);
      setMsg("Select Category");
      return;
    }

    if (quiz.health === "") {
      setErr(true);
      setMsg("Select Health Points");
      return;
    }

    if (timer && quiz.time === "") {
      setErr(true);
      setMsg("Provide a time for quiz timer");
      return;
    } else if (timer && isNaN(quiz.time)) {
      setErr(true);
      setMsg("Provide a minute format time on time limit");
      return;
    }
    router.push("/createQuiz/questions");
  }

  return (
    <div className="">
      {err && (
        <div role="alert" className="alert alert-error">
          <span>{msg}</span>
        </div>
      )}
      <div className="flex align-middle items-center flex-row max-sm:flex-col mb-3">
        <input
          type="text"
          placeholder="Quiz title"
          name="title"
          className={`input input-bordered w-3/4 input-md me-3 flex-auto max-sm:flex-none`}
          onChange={(e) => handleChange(e)}
          value={quiz.title}
        />

        <div className="flex-auto ">
          <div className="flex align-middle items-center">
            <span className="label-text">Timer</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={() => setTimer((prev) => !prev)}
            />
            <input
              type="text"
              name="timer"
              className={`input input-md flex-auto ms-3 ${
                !timer && " input-disabled pointer-events-none"
              }`}
              placeholder={timer ? "Format: Minutes" : "Timer Disabled"}
              onChange={(e) => handleChange(e)}
              value={quiz.time}
            />
          </div>
        </div>
      </div>

      <div className="flex mb-3">
        <select
          className="select select-bordered w-auto max-w-xs flex-auto"
          name="takes"
          onChange={(e) => handleChange(e)}
          // value={quiz.takes}
        >
          <option disabled selected>
            Quiz take count
          </option>
          <option>1</option>
          <option>3</option>
          <option>5</option>
          <option>unlimited</option>
        </select>
        <select
          className="select select-bordered w-full flex-auto max-w-md ms-2 me-2"
          name="category"
          onChange={(e) => handleChange(e)}
        >
          <option disabled selected>
            Category
          </option>
          {categories.sort().map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select
          className="select select-bordered w-full flex-auto max-w-xs"
          name="health"
          onChange={(e) => handleChange(e)}
        >
          <option disabled selected>
            Health Points
          </option>
          <option>1</option>
          <option>3</option>
          <option>5</option>
          <option>unlimited</option>
        </select>
      </div>

      <div className="form-label">
        <textarea
          className={`textarea textarea-bordered h-24 textarea-sm mb-5 w-full`}
          placeholder="Short description..."
          name="description"
          onChange={(e) => handleChange(e)}
          value={quiz.description}
        />
      </div>
      <button className="btn btn-primary btn-lg" onClick={isError}>
        Create Questions
      </button>
    </div>
  );
}

export default CreateDetails;
