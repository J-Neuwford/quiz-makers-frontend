import "./quiz.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getQuizId from "../new-quiz/new-quiz";

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctOption: string;
};

const getFakeQuestions = async () => {
  return {
    data: {
      id: 3,
      questions: ["What is the capital of France?", "Which color is #ffffff?"],
    },
  };
};

const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchQuestions() {
    try {
      const response = await getFakeQuestions();

      const formattedQuestions: Question[] = response.data.questions.map(
        (text, index) => ({
          id: index + 1,
          text,
          options: [],
          correctOption: "",
        })
      );

      setQuestions(formattedQuestions);
      setIsLoading(false); // Set loading to false when questions are fetched
    } catch (err) {
      console.error("Error fetching questions:", err);
      setIsLoading(false); // Set loading to false even on error
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.correctOption === option) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setSelectedOption("completed");
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-container">
        <h1>
          Quiz Name:
          {/* {quizId/quiz.title} */}
        </h1>

        <div>
          {selectedOption === "completed" ? (
            <div>
              <h2>Quiz Completed!</h2>
              <p>Total Score: {score}</p>
            </div>
          ) : (
            <div>
              <h2>Question: {currentQuestion.text}</h2>
              <h2>Options:</h2>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleOptionSelect(option)}
                      disabled={selectedOption !== null}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
