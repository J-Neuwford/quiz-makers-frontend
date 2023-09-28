import { useState, useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";

// export type Quiz = {
//   id: number;
//   title: string | null;
//   questions: Question[];
// };
// export type Question = {
//   id: number;
//   questionText: string;
//   options: Answer[];
// };

// export type Answer = {
//   id: number;
//   answerText: string;
//   isCorrect: boolean;
// };

const Home = () => {
  const [quizzes, setQuizzes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchQuizTitles() {
      try {
        const response = await axios.get("/api/quizzes");
        const quizTitles = response.data.quizzes.map(
          (quiz: { title: string | null }, index: number) =>
            quiz.title || `Untitled Quiz ${index + 1}`
        );
        setQuizzes(quizTitles);
      } catch (err) {
        console.log(err);
      }
    }

    fetchQuizTitles(); // Gets all quizzes titles when the component mounts so I don't need a button for that.
  }, []); // Empty dependency array to ensure it only runs once

  const renderQuizButtons = () => {
    return quizzes.map((quizTitle, index) => (
      <Link to={`/quiz/${encodeURIComponent(quizTitle)}`} key={index}>
        <div>
          <button type="button">{quizTitle}</button>
        </div>
      </Link>
    ));
  };

  return (
    <div className="page-container">
      <div>
        <h1>Welcome to the Quiz Maker App</h1>

        <div>
          <Link to="/new-quiz">
            <div>
              <button className="new-quiz-button">Create a New Quiz</button>
            </div>
          </Link>
        </div>
        <div>
          <h1>Choose a quiz to play 😄</h1>
          <Link to="/quiz/:quiz.title">
            <div className="quizzes-buttons">{renderQuizButtons()}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
