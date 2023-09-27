import "./quiz.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../new-quiz/new-quiz";

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctOption: string;
};

const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(`/api/quizzes/${id}/questions`);
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    }

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

  if (questions.length === 0) {
    // If Im not able to fetch the questions from the api
    return (
      <div>
        <h1>No questions found</h1>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
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
            <h2>Question:</h2>
            <p>{currentQuestion.text}</p>
            <h3>Options:</h3>
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
    </>
  );
};

export default Quiz;
