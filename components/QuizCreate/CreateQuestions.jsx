"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  setQuestion,
  setQuestionType,
  resetQuestion,
} from "@/lib/questionSlice";

import { addQuestion } from "@/lib/quizSlice";
import { useEffect, useState } from "react";
import Identification from "./QuestionType/Identification";
import MultipleChoice from "./QuestionType/MultipleChoice";
import TrueOrFalse from "./QuestionType/TrueOrFalse";

function CreateQuestions() {
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
      setSuccess(false);
    }, 3000);

    // Clear the timeout to prevent it from triggering if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [error, success]);

  function checkError() {
    if (question.question === "") {
      setError(true);
      setMsg("Fill up the question");
      return;
    }

    if (question.answer === "") {
      setError(true);
      setMsg("Fill up the answer");
      return;
    }

    if (question.questionType === "multipleChoice") {
      question.choices.forEach((choice) => {
        if (choice === "") {
          setError(true);
          setMsg("Fill up all the choices selection");
          return;
        }

        if (!question.choices.includes(question.answer)) {
          setError(true);
          setMsg("Select the answer from the choices");
          return;
        }
      });
    }

    if (question.questionType === "tof") {
      if (!question.answer === "true" || !question.answer === "false") {
        setError(true);
        setMsg("Select answer from true or false");
        return;
      }
    }

    setError(false);
    dispatch(addQuestion(question));
    dispatch(resetQuestion());
    setMsg("Question Added");
    setSuccess(true);
  }

  return (
    <div className="static">
      {error && (
        <div role="alert" className="alert alert-error">
          <span>{msg}</span>
        </div>
      )}
      {success && (
        <div role="alert" className="alert alert-success">
          <span>{msg}</span>
        </div>
      )}
      <div>
        <textarea
          type="text"
          placeholder="Question"
          className="flex textarea-lg textarea textarea-bordered w-full max-w-xs mb-3 me-3 "
          value={question.question}
          onChange={(e) => {
            dispatch(setQuestion(e.target.value));
            setSuccess(false);
          }}
          required
        />
        <select
          className="flex-auto select select-bordered w-1/2 max-w-xs mb-3"
          onChange={(e) => {
            dispatch(setQuestionType(e.target.value));
            setSuccess(false);
          }}
          defaultValue={question.questionType}
        >
          <option value="identification">Identification</option>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="tof">True or False</option>
        </select>

        {question.questionType === "identification" && <Identification />}
        {question.questionType === "multipleChoice" && <MultipleChoice />}
        {question.questionType === "tof" && <TrueOrFalse />}
      </div>
      <button
        type="button"
        onClick={checkError}
        className="btn btn-success bottom-0 left-0 absolute w-full"
      >
        Add Question
      </button>
    </div>
  );
}

export default CreateQuestions;
