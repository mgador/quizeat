import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import questionReducer from "./questionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      quiz: quizReducer,
      question: questionReducer,
    },
  });
};
