"use client";

import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnswer,
  setIndex,
  updateChoice,
  addChoice,
  removeChoice,
} from "@/lib/questionSlice";

function MultipleChoice() {
  const { choices } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  return (
    <div className="overflow-y-scroll h-52">
      {choices.map((q, index) => (
        <div className="flex" key={index}>
          <input
            type="radio"
            className="radio radio-primary me-3 max-sm:radio-sm radio-lg"
            name="choices"
            value={index}
            onChange={(e) => {
              dispatch(setAnswer(choices[e.target.value]));
            }}
          />
          <input
            type="text"
            // onChange={(e) => handleInputChange(index, e.target.value)}
            onChange={(e) => {
              dispatch(setIndex(Number(index)));
              dispatch(updateChoice(e.target.value));
            }}
            className="input input-bordered me-3 mb-2 max-sm:input-sm"
          />

          {index === 0 && (
            <button
              type="button"
              onClick={() => {
                dispatch(addChoice());
              }}
              className="btn  btn-success me-1"
            >
              <FaPlus />
            </button>
          )}
          {index > 0 && (
            <button
              type="button"
              onClick={() => {
                dispatch(removeChoice(index));
              }}
              className="btn btn-error"
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MultipleChoice;
