import { useState, useEffect } from "react";
import "./all-quizzes.css";
import { Link } from "react-router-dom";
import axios from "axios";

const AllQuizzes = () => {
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

    fetchQuizTitles(); // Fetch quiz titles when the component mounts
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
        <h1>Choose a quiz to play</h1>
        <div className="quizzes-buttons">{renderQuizButtons()}</div>
      </div>
    </div>
  );
};

export default AllQuizzes;
