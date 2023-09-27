//import { useNavigate } from "react-router-dom";
//import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-container">
      <div>
        <h1>Welcome to the Quiz Maker App</h1>
        <div>
          <button className="new-quiz-button">New Quiz</button>
        </div>
        <div className="quizzes-buttons">
          <Link to="/quiz">
            <div>
              <button>QuizText</button>
            </div>
          </Link>
          <button>Art</button>
          <button>Film</button>
          <button>Geography</button>
          <button>History</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
