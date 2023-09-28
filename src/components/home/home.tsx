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
  //   const [quizzes, setQuizzes] = useState<string[]>([]);

  //   const fetchQuizTitles = async () => {
  //     try {
  //       const response = await axios.get("/api/quizzes");
  //       const quizTitles = response.data.quizzes.map(
  //         (quiz: { title: string | null }, index: number) =>
  //           quiz.title || `Untitled Quiz ${index + 1}`
  //       );
  //       setQuizzes(quizTitles);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const renderQuizButtons = () => {
  //     return quizzes.map((quizTitle, index) => (
  //       <Link to={`/quiz/${encodeURIComponent(quizTitle)}`} key={index}>
  //         <div>
  //           <button type="button">{quizTitle}</button>
  //         </div>
  //       </Link>
  //     ));
  //   };

  //   return (
  //     <div className="container">
  //       <div>
  //         <h1>Welcome to the Quiz Maker App</h1>

  //         <div>
  //           <Link to="/new-quiz">
  //             <div>
  //               <button className="new-quiz-button">Create a New Quiz</button>
  //             </div>
  //           </Link>
  //         </div>

  //         <div>
  //           <Link to="/all-quizzes">
  //             <div className="quizzes-buttons">{renderQuizButtons()}</div>
  //             <button onClick={fetchQuizTitles}>Show all quizzes</button>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
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
        <h1>Welcome to the Quiz Maker App</h1>

        <div>
          <Link to="/new-quiz">
            <div>
              <button className="new-quiz-button">Create a New Quiz</button>
            </div>
          </Link>
        </div>
        <div>
          <h1>Choose a quiz to play</h1>
          <div className="quizzes-buttons">{renderQuizButtons()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
