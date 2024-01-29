"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";

function QuizDetails(props) {
  const router = useRouter();
  const [tab, setTab] = useState("details");

  return (
    <dialog id="quizDetails" className="modal">
      <div className="modal-box w-2/4 h-4/5">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">
            ✕
          </button>
        </form>
        <div role="tablist" className="tabs tabs-lifted mb-2">
          <a
            role="tab"
            className={`tab ${
              tab === "details" && "tab-active [--tab-border-color:lightpurple]"
            }`}
            onClick={() => setTab("details")}
          >
            Details
          </a>
          <a
            role="tab"
            className={`tab ${
              tab === "leaderboards" &&
              "tab-active [--tab-border-color:lightpurple]"
            } `}
            onClick={() => setTab("leaderboards")}
          >
            Leaderboards
          </a>
        </div>
        {tab === "details" && (
          <div>
            <h3 className="font-bold text-xl mt-5">{props.title}</h3>
            <p className="text-md text-gray-300 font-bold mb-8">
              Author: <span className=" font-light">{props.author}</span>
            </p>
            <p>
              Time Limit:{" "}
              {isNaN(props.time) || props.time === ""
                ? "No Time Limit"
                : `${props.time}min`}
            </p>
            <p>Health Points: {props.health}</p>
            <p className="mb-8">
              No. of takes: <span>{props.takes}</span>
            </p>
            <h1 className="text-lg font-bold">Description</h1>
            <p className=" indent-5 text-sm">{props.description}</p>
          </div>
        )}
        {tab === "leaderboards" && (
          <div className=" overflow-y-scroll h-5/6 mb">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>

              <tbody>
                {props.participants
                  .sort((a, b) => b.score - a.score)
                  .map((participant, index) => (
                    <>
                      <tr>
                        <th>
                          {index === 0 ? (
                            <FaCrown className=" text-yellow-400" />
                          ) : index === 1 ? (
                            <FaCrown className=" text-slate-400" />
                          ) : index === 2 ? (
                            <FaCrown className=" text-amber-900" />
                          ) : (
                            index
                          )}
                        </th>
                        <th>{participant.name}</th>
                        <th>{participant.score}</th>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          className="btn btn-primary btn-block bottom-0 left-0 absolute"
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
