"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetQuiz } from "@/lib/quizSlice";
import { resetQuestion } from "@/lib/questionSlice";

function CancelQuiz() {
  const dispatch = useDispatch();
  return (
    <div>
      <dialog id="confirmCancel" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Cancel</h3>
          <p className="py-4">
            Do you really want to cancel your creation progress?
          </p>
          <div className="modal-action mx-auto">
            <form method="dialog">
              <button className="btn btn-error me-5">No</button>
              <Link
                href="/dashboard"
                className="btn btn-success"
                onClick={() => {
                  dispatch(resetQuiz());
                  dispatch(resetQuestion());
                }}
              >
                Yes
              </Link>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CancelQuiz;
