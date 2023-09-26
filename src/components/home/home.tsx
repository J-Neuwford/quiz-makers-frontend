//import { useNavigate } from "react-router-dom";
//import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz Maker App</h1>
      <div className="quiz-buttons">
        <button className="quiz-button">Art Quiz</button>
        <button className="quiz-button">Geography Quiz</button>
        <button className="quiz-button">History Quiz</button>
      </div>
    </div>
  );
};

// function Home() {
//   const navigate = useNavigate();

// const startQuiz = (quizType: string) => {
//   navigate(`/`);
//   //navigate(`/quiz/${quizType}`);
// };

// const startQuiz = () => {
//   navigate(`/`);
//   //navigate(`/quiz/${quizType}`);
// };

//   return (
//     <div className="home-container">
//       <h1>Welcome to the Quiz Maker App</h1>
//       <div className="quiz-buttons">
//         <button className="quiz-button" onClick={() => startQuiz()}>
//           Art Quiz
//         </button>
//         <button className="quiz-button" onClick={() => startQuiz()}>
//           Geography Quiz
//         </button>
//         <button className="quiz-button" onClick={() => startQuiz()}>
//           History Quiz
//         </button>
//       </div>
//     </div>
//   );
// }

export default Home;
