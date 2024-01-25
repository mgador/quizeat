"use client";

import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/lib/questionSlice";

function Identification() {
  const { answer } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        className="input input-bordered mb-3"
        placeholder="Answer"
        value={answer}
        onChange={(e) => dispatch(setAnswer(e.target.value))}
      />
    </div>
  );
}

export default Identification;
