"use client";
import { useDispatch } from "react-redux";
import { setAnswer } from "@/lib/questionSlice";

function TrueOrFalse() {
  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(setAnswer(e.target.value));
  }
  return (
    <div className="mb-5">
      <div>
        <input
          type="radio"
          name="tof"
          className="radio radio-sm radio-primary me-5"
          value="true"
          id="true"
          onClick={(e) => handleClick(e)}
        />
        <label htmlFor="true" className="">
          True
        </label>
      </div>
      <div className=" place-items-center">
        <input
          type="radio"
          name="tof"
          className="radio radio-primary radio-sm me-5"
          value="false"
          id="false"
          onClick={(e) => handleClick(e)}
        />
        <label htmlFor="false">False</label>
      </div>
    </div>
  );
}

export default TrueOrFalse;
