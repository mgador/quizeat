"use client";

import { useRouter } from "next/navigation";

function QuizDetails(props) {
  const router = useRouter();
  return (
    <dialog id="quizDetails" className="modal static">
      <div className="modal-box w-2/4 h-3/4">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <h3 className="font-bold text-lg">{props.title}</h3>
          <p className="text-sm text-gray-300">Author: {props.author}</p>
          <p className="py-4">{props.description}</p>
        </div>
        <button
          className="btn btn-primary bottom-0 left-0 absolute w-full"
          value={props.quizId}
          onClick={() => {
            router.push(`/quizeat/${props.quizId}`);
          }}
        >
          Take Quiz
        </button>
      </div>
    </dialog>
  );
}

export default QuizDetails;
