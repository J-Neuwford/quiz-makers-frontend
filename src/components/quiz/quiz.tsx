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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`/api/quizzes/${id}`);
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
    let points = 0;
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (currentQuestion && currentQuestion.id === questionId) {
      const selectedAnswer = currentQuestion.options.find(
        (option) => option.id === answerId
      );
      if (selectedAnswer && selectedAnswer.isCorrect) {
        points = points + 1;
      }
    }

    // After we update the points, we move to the next question (if it exists)
    setSelectedOption(answerId);
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const totalPoints = points;
    return totalPoints;
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
          <h2>Question: {currentQuestion.questionText}</h2>
          <h2>Options:</h2>
          <ul>
            {currentQuestion.options.map((option) => (
              <li key={option.id}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option.id}
                    onChange={() =>
                      handleOptionSelect(currentQuestion.id, option.id)
                    }
                    checked={selectedOption === option.id}
                  />
                  {option.answerText}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Quiz;
