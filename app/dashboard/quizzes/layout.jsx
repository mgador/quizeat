import QuizDetails from "@/components/Quiz/QuizDetails";

function layout({ children }) {
  return (
    <div className="">
      {children}
      <QuizDetails />
    </div>
  );
}

export default layout;
