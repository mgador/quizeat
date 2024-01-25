import { useDispatch, useSelector } from "react-redux";
import Collapse from "../ui/Collapse";
import { removeQuestion } from "@/lib/quizSlice";
import { FaTrash } from "react-icons/fa";

function QuestionList() {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  return (
    <div className="overflow-x-auto overflow-y-scroll">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Question</th>
            <th>Question Type</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quiz.questions.map((question, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{question.question}</td>
              <td>{question.questionType}</td>
              <td>{question.answer}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(removeQuestion(index));
                  }}
                  className="btn btn-error"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
