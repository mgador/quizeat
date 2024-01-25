import { MdCancel } from "react-icons/md";

function CancelQuizButton() {
  return (
    <div className="flex">
      <button
        onClick={() => document.getElementById("confirmCancel").showModal()}
      >
        <MdCancel className="text-2xl mb-5 text-start self-start" />
      </button>
    </div>
  );
}

export default CancelQuizButton;
