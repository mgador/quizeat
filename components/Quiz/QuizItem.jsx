"use client";

function QuizItem(props) {
  const description =
    props.description.length > 50
      ? `${props.description.slice(0, 50)}...`
      : props.description;

  return (
    <div className=" card w-40 bg-base-100 me-3">
      <figure className="relative">
        <img
          src="/assets/images/quiz_placeholder.jpg"
          alt="quiz_bg"
          className=""
        />
        <h2 className="card-title absolute bottom-0 left-0 ms-2 mb-1 font-bold text-pretty text-indigo-50">
          {props.title}
        </h2>
      </figure>
      <div className="card-body relative">
        <p className="absolute top-0 left-0 ms-2 text-slate-500">
          @{props.author}
        </p>
        <p className="text-sm justify-center">{description}</p>
        <div className="card-actions">
          <button
            className="btn btn-primary text-center"
            value={props.quizId}
            onClick={(e) => {
              props.clickHandler(e.target.value);
              document.getElementById("quizDetails").showModal();
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizItem;
