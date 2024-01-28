// quizSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: "",
  authorId: "",
  questions: [],
  takes: "",
  description: "",
  title: "",
  health: "",
  category: "",
  time: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setAuthorId: (state, action) => {
      state.authorId = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setTakes: (state, action) => {
      state.takes = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload];
    },
    removeQuestion: (state, action) => {
      const temp = [...state.questions];
      temp.splice(action.payload, 1);
      state.questions = temp;
    },
    setHealth: (state, action) => {
      state.health = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTimeLimit: (state, action) => {
      state.time = action.payload;
    },

    resetQuiz: (state) => {
      state.author = "";
      state.authorId = "";
      state.questions = [];
      state.takes = "";
      state.description = "";
      state.title = "";
      state.category = "";
      state.time = "";
      state.health = "";
    },
  },
});

export const {
  setAuthor,
  setAuthorId,
  setTitle,
  setDescription,
  setTakes,
  addQuestion,
  removeQuestion,
  setQuestions,
  resetQuiz,
  setHealth,
  setCategory,
  setTimeLimit,
} = quizSlice.actions;
export default quizSlice.reducer;
