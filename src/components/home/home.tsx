//import { useNavigate } from "react-router-dom";
//import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-container">
      <div>
        <h1>Welcome to the Quiz Maker App</h1>

        <div >
          <Link to="/new-quiz">
            <div>
              <button className="new-quiz-button">New Quiz</button>
            </div>
          </Link>
        </div>

        <div className="quizzes-buttons">
          <Link to="/quiz">
            <div>
              <button>QuizText</button>
            </div>
          </Link>

          {/* <Link to="/quiz/:id">
            <div>
              <button>value={quiz.title}</button>
            </div>
          </Link> */}

          <button>Arts</button>
          <button>Geography</button>
          <button>History</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
