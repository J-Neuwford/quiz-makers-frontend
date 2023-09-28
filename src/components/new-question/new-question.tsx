import { useState } from "react";
import axios from "axios";
import { QuestionProps } from "../new-quiz/new-quiz";

export type AnswerProps = {
  answerText: string;
  isCorrect: boolean;
  questionId: number | null;
};

export type NewQuestionProps = {
  quizTitle: string;
  newQuizId: number;
};

// quizTitle and newQuizId: any type warning
const NewQuestion = ({ quizTitle, newQuizId }: NewQuestionProps) => {
  const [question, setQuestion] = useState<QuestionProps>({
    questionText: "",
    quizId: 0,
  });

  const [answers, setAnswers] = useState<AnswerProps[]>([
    {
      answerText: "",
      // first answer in form will be set to true
      // we will need another function to mix these
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

  // posts new questions and answers to the backend
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      //post question
      const response = await axios.post("/api/questions/new", question);
      console.log(response);

      // post all answers, interating in case we want to add more answers later
      const questionId = await getNewQuestionId();
      for (let i = 0; i < answers.length; i++) {
        const response = await axios.post(
          `/api/answers/:${questionId}/new`,
          answers[i]
        );
        console.log(response);
      }

      // reset input fields
      setQuestion({
        questionText: "",
        quizId: newQuizId,
      });
      const newAnswers = [...answers];
      for (let i = 0; i < answers.length; i++) {
        newAnswers[i].answerText = "";
        setAnswers(newAnswers);
      }
    } catch (err) {
      console.log("Post to backend unsuccessful.", err);
    }
  };

  /*
GET NEW QUESTION ID
this helper function gets the new question ID
it currently gets all the questions, so we can add a 'getLastQuestion' method 
to the question controller to simplify this. 
*/
  const getNewQuestionId = async () => {
    console.log("requesting question id");
    try {
      //get all questions
      const response = await axios.get("/api/questions");
      // get the last question in the questions array
      const lastQuestionIndex = response.data.questions.length - 1;
      console.log("response:", response.data.questions[lastQuestionIndex].id);
      return response.data.questions[lastQuestionIndex].id;
    } catch (err) {
      console.log("get quizzes unsuccessful");
    }
  };

  const handleChange = async (i: number, e: any) => {
    // make a copy of the answers array
    const newAnswers = [...answers];

    //update answer text with each key
    newAnswers[i].answerText = e.target.value;

    // get the new question ID and add it to the answers
    // this also happens every key, so can be refactored and stored in state
    const questionId = await getNewQuestionId();
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
            rows={3}
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
            onChange={(e) => handleChange(0, e)} //(answers array element, event)
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
