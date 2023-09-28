import "./quiz.css";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

export type Quiz = {
  id: number;
  title: string | null;
  questions: Question[];
};

export type Question = {
  id: number;
  questionText: string;
  options: Answer[];
};

export type Answer = {
  id: number;
  answerText: string;
  isCorrect: boolean;
};

const Quiz = () => {
  return (
    <>
      <div className="quiz-container">
        <h1>Quiz Name: </h1>
        {/* show all questions and their 3 possible answers as radio button, so only one answer can be clicked */}
      </div>
    </>
  );
};

export default Quiz;
