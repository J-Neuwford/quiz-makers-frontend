import { useState } from "react";
import axios from "axios";
import { QuizProps, QuestionProps } from "../new-quiz/new-quiz";

export type AnswerProps = {
  answerText: string;
  isCorrect: boolean;
  questionId: number | null;
};

const NewQuestion = ({ quizTitle, newQuizId }) => {
  const [question, setQuestion] = useState<QuestionProps>({
    questionText: "",
    quizId: 0,
  });

  const [answers, setAnswers] = useState<AnswerProps[]>([
    {
      answerText: "",
      isCorrect: true,
      questionId: null,
    },
    {
      answerText: "",
      isCorrect: false,
      questionId: null,
    },
    {
      answerText: "",
      isCorrect: false,
      questionId: null,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const qResponse = await axios.post("/api/questions/new", question);
      console.log(qResponse);

      const questionId = await getQuestionId();
      const a1Response = await axios.post(
        `/api/answers/:${questionId}/new`,
        answers[0]
      );
      console.log(a1Response);
      const a2Response = await axios.post(
        `/api/answers/:${questionId}/new`,
        answers[1]
      );
      console.log(a2Response);
      const a3Response = await axios.post(
        `/api/answers/:${questionId}/new`,
        answers[2]
      );
      console.log(a3Response);

      setQuestion({
        questionText: "",
        quizId: newQuizId,
      });
    } catch (err) {
      console.log("Post to backend unsuccessful.", err);
    }
  };

  const getQuestionId = async () => {
    console.log("requesting question id");
    try {
      const response = await axios.get("/api/questions");
      const lastQuestionIndex = response.data.questions.length - 1;
      console.log("response:", response.data.questions[lastQuestionIndex].id);
      return response.data.questions[lastQuestionIndex].id;
    } catch (err) {
      console.log("get quizzes unsuccessful");
    }
  };

  const handleChange = async (i: number, e: any) => {
    const newAnswers = [...answers];
    newAnswers[i].answerText = e.target.value;
    const questionId = await getQuestionId();
    newAnswers[i].questionId = questionId;
    setAnswers(newAnswers);
  };

  return (
    <>
      <div>{`Your ${quizTitle} quiz`}</div>
      <form>
        <div>
          <label>Add a question</label>
        </div>
        <div>
          <textarea
            rows="3"
            value={question.questionText}
            onChange={(e) => {
              setQuestion({
                ...question,
                questionText: e.target.value,
                quizId: newQuizId,
              });
            }}
          />
        </div>
        <div>
          <label>What is the correct answer?</label>
        </div>
        <div>
          <input
            type="text"
            value={answers[0].answerText}
            onChange={(e) => handleChange(0, e)}
          />
        </div>
        <div>
          <label>Add a wrong answer:</label>
        </div>
        <div>
          <input
            type="text"
            value={answers[1].answerText}
            onChange={(e) => handleChange(1, e)}
          />
        </div>
        <div>
          <label>Add another wrong answer:</label>
        </div>
        <div>
          <input
            type="text"
            value={answers[2].answerText}
            onChange={(e) => handleChange(2, e)}
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          Add question
        </button>
      </form>
    </>
  );
};

export default NewQuestion;
