"use client";
import { useEffect, useState } from "react";
import QuizItem from "./QuizItem";
import QuizDetails from "./QuizDetails";
import categories from "@/public/assets/categories";
import DashboardNav from "../Dashboard/DashboardNav";
import SearchBar from "../ui/SearchBar";
import { getSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    async function getQuizzes() {
      const session = await getSession();
      const apiLink =
        pathname === "/dashboard/quizzes"
          ? "/api/quizzes"
          : `/api/myQuizzes/${session?.user?.id}`;
      const res = await fetch(apiLink);
      const data = await res.json();
      setQuizzes(data.quizzes);
      setLoading(false);
    }
    getQuizzes();
  }, []);

  async function handleClick(id) {
    const res = await fetch(`/api/quizzes/${id}`);
    const data = await res.json();
    console.log(data.quiz);
    setQuiz(data.quiz);
  }

  function handleSearch(value) {
    setSearch(value);

    if (category === "") {
      setFilteredQuizzes(
        quizzes.filter(
          (quiz) =>
            quiz.title.toLowerCase().includes(value.toLowerCase()) ||
            quiz.author.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredQuizzes(
        quizzes.filter(
          (quiz) =>
            (quiz.title.toLowerCase().includes(value.toLowerCase()) ||
              quiz.author.toLowerCase().includes(value.toLowerCase())) &&
            quiz.category === category
        )
      );
    }
  }

  return (
    <div className="h-screen overflow-auto">
      <DashboardNav>
        <SearchBar onChange={handleSearch} />
      </DashboardNav>
      <div className="w-56 left-0 top-16 fixed bg-base-200">
        <h1 className="text-center font-bold text-xl my-3">Categories</h1>
        {categories.map((c) => (
          <button
            className={`btn btn-block ${
              c === category && " bg-primary hover:bg-primary text-base-200"
            }`}
            key={c}
            onClick={() => {
              setCategory(c);
              setFilteredQuizzes(quizzes.filter((quiz) => quiz.category === c));
            }}
          >
            {c}
          </button>
        ))}
        <button
          className="btn btn-primary btn-block"
          onClick={() => setCategory("")}
        >
          Clear
        </button>
      </div>
      <div className=" ms-64 pt-24 grid grid-cols-5 overflow-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-1 max-sm:grid-cols-1">
        {loading && <div>Loading...</div>}
        {category === "" &&
          search === "" &&
          quizzes.map((item) => (
            <QuizItem
              key={item._id}
              title={item.title}
              author={item.author}
              description={item.description}
              quizId={item._id}
              category={item.category}
              time={item.time}
              health={item.health}
              takes={item.takes}
              questions={item.questions}
              participants={item.participants}
              participantId={async () => {
                const session = await getSession();
                return session.user.id;
              }}
              clickHandler={handleClick}
            />
          ))}
        {categories !== "" &&
          filteredQuizzes.map((item) => (
            <QuizItem
              key={item._id}
              title={item.title}
              author={item.author}
              description={item.description}
              quizId={item._id}
              category={item.category}
              time={item.time}
              health={item.health}
              takes={item.takes}
              clickHandler={handleClick}
            />
          ))}
        <QuizDetails
          title={quiz.title}
          description={quiz.description}
          author={quiz.author}
          quizId={quiz._id}
          participants={quiz.participants}
          time={quiz.time}
          category={quiz.category}
          health={quiz.health}
          takes={quiz.takes}
        />
      </div>
    </div>
  );
}

export default QuizList;
