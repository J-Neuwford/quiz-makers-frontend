import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Quiz from "../components/quiz/quiz";

export type IdParams = {
  id: string;
};

export default function QuizPage() {

  // const { id } useParams<IdParams>();
  
  // const quizId = parseInt(id, 10);
  
  return (
    <>
      <div className="page-container">
        <Navbar />
        <Quiz />
      </div>
    </>
  );
}
