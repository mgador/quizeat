import mongoose from "mongoose";

const { Schema } = mongoose;

const quizzesSchema = new Schema({
  title: String,
  author: String,
  authorId: String,
  description: String,
  takes: String,
  health: String,
  category: String,
  time: String,
  participants: [
    {
      name: String,
      participantId: String,
      score: Number,
    },
  ],
  questions: [
    {
      question: String,
      questionType: String,
      answer: String,
      choices: Array,
    },
  ],
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizzesSchema);

export default Quiz;
