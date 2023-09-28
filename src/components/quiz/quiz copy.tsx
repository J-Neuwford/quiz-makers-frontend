import "./quiz.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get("/api/quizzes/${id}");
        setQuiz(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setIsLoading(false);
      }
    }

    fetchQuiz();
  }, [id]);

  const handleOptionSelect = (questionId: number, answerId: number) => {
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (currentQuestion && currentQuestion.id === questionId) {
      const correctAnswer = currentQuestion.options.find(
        (answer) => answer.isCorrect
      );

      if (correctAnswer && correctAnswer.id === answerId) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < quiz!.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setSelectedOption(-1);
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div>
        <h1>Quiz not found</h1>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <>
      <div className="quiz-container">
        <h1>Quiz Name: {quiz.title}</h1>

        <div>
          {selectedOption === -1 ? ( // Check for completion using -1
            <div>
              <h2>Quiz Completed!</h2>
              <p>Total Score: {score}</p>
            </div>
          ) : (
            <div>
              <h2>Question: {currentQuestion.questionText}</h2>
              <h2>Options:</h2>
              <ul>
                {currentQuestion.options.map((option) => (
                  <li key={option.id}>
                    <button
                      onClick={() =>
                        handleOptionSelect(currentQuestion.id, option.id)
                      }
                      disabled={selectedOption !== null}
                    >
                      {option.answerText}
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
