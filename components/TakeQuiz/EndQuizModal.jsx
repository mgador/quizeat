import { useRouter } from "next/navigation";

function EndQuizModal({ msg, score }) {
  const router = useRouter();
  return (
    <dialog id="endquiz" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{msg}</h3>
        <p className="py-4">Your score is: {score}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => router.push("/dashboard")}>
              Home
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default EndQuizModal;
