"use client";

import React, { useState, useEffect } from "react";

function Timer({ initialTime, handleTimesUp }) {
  const [time, setTime] = useState(initialTime * 60); // Convert minutes to seconds

  useEffect(() => {
    if (time <= 0) {
      handleTimesUp();
    }

    let interval;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <p className="text-lg font-bold ">
        Remaining Time:
        <span className="text-blue-600"> {formatTime(time)}</span>
      </p>
    </div>
  );
}

export default Timer;
