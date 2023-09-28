import Navbar from "../components/navbar/navbar";
import Quiz from "../components/quiz/quiz";

export type IdParams = {
  id: string;
};

export default function QuizPage() {
  return (
    <>
      <div className="page-container">
        <Navbar />
        <Quiz />
      </div>
    </>
  );
}
