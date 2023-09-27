//import { useNavigate } from "react-router-dom";
//import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="page-container">
      <div>
        <h1>Welcome to the Quiz Maker App</h1>
        <div>
          <button className="new-quiz-button">New Quiz</button>
        </div>
        <div className="buttons-and-text">
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
