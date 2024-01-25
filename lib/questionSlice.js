import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  question: "",
  choices: [""],
  index: 0,
  answer: "",
  questionType: "identification",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setChoices: (state, action) => {
      state.choices = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setQuestionType: (state, action) => {
      state.questionType = action.payload;
    },
    addChoice: (state) => {
      state.choices = [...state.choices, ""];
    },
    updateChoice: (state, action) => {
      state.choices[state.index] = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
      console.log(state.index);
    },

    removeChoice: (state, action) => {
      const temp = [...state.choices];
      temp.splice(action.payload, 1);
      state.choices = temp;
    },
    resetQuestion: (state) => {
      state.question = "";
      state.answer = "";
      state.choices = [""];
      state.questionType = "identification";
    },
  },
});

export const {
  setIndex,
  setQuestion,
  setChoices,
  setAnswer,
  setQuestionType,
  addChoice,
  removeChoice,
  updateChoice,
  resetQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
